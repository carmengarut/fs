const dealsRouter = require('express').Router()
const Deal = require('../models/Deal')
const User = require('../models/User.js')
const userExtractor = require('../middleware/userExtractor')
const { sendProposeChangeEmail } = require('../middleware/emailNotifications')

dealsRouter.get('/', async (request, response) => {
  const deals = await Deal.find({})
    .populate('createdBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('member', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('signedBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('ratings', {
      fulfilled: 1,
      content: 1,
      recipient: 1,
      createdBy: 1
    })

  response.json(deals)
})

dealsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Deal.findById(id)
    .populate('createdBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('member', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('signedBy', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('ratings', {
      fulfilled: 1,
      content: 1,
      recipient: 1,
      createdBy: 1,
    })
    .then(deal => {
      if (deal) {
        return response.json(deal)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

dealsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  await Deal.findByIdAndDelete(id)

  try {
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// en el siguiente post, primerto ejecuta el user extractor y luego la funcion async
dealsRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, content, memberEmail } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'Deal content is missing'
    })
  }

  const member = await User.findOne({ email: memberEmail })
  if (!member) {
    return response.status(400).json({
      error: 'Please, add a valid member email'
    })
  }

  const { userId } = request
  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({
      error: 'User does´t exist'
    })
  }

  const newDeal = new Deal({
    title,
    content,
    date: new Date().toISOString(),
    status: 'New',
    createdBy: user._id,
    member: member._id,
    signedBy: [user.id]
  })

  try {
    const savedDeal = await newDeal.save()
    user.deals = user.deals.concat(savedDeal._id)
    await user.save()

    response.status(201).json(savedDeal)
  } catch (error) {
    next(error)
  }
})

dealsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const { title, content, senderName, receiverName, receiverEmail } = request.body
  const newDeal = {
    title,
    content,
    signedBy: []
  }
  try {
    const result = await Deal.findByIdAndUpdate(id, newDeal, { new: true })
  
    if (result === null) {
      return response.status(400).json({
        error: 'Deal does´t exist'
      })
    }
      
    sendProposeChangeEmail(senderName, receiverName, receiverEmail, title)
    response.json(result)

} catch(e) {
  next(e)
}
  

  


})

dealsRouter.put('/:id/sign', userExtractor, async (request, response) => {
  const { id } = request.params
  const { users } = request.body

  const deal = await Deal.findById(id).populate('signedBy', {
    email: 1,
    name: 1,
    surname: 1
  })

  deal.signedBy = users

  if (deal.signedBy.length >= 2) {
    deal.status = 'Signed'
  }

  await deal.save()
  const savedDeal = await Deal.findById(id).populate('signedBy', {
    email: 1,
    name: 1,
    surname: 1
  })
  response.json(savedDeal)
})


module.exports = dealsRouter
