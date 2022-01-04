const itemsRouter = require('express').Router()
const Item = require('../models/Item')
const Business = require('../models/Business.js')
const userExtractor = require('../middleware/userExtractor')

itemsRouter.get('/', async (request, response) => {
  const items = await Item.find({})
    .populate('business', {
      email: 1,
      name: 1
    })

  response.json(items)
})

itemsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Item.findById(id)
    .populate('business', {
      email: 1,
      name: 1
    })
    .then(item => {
      if (item) {
        return response.json(item)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

itemsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  await Item.findByIdAndDelete(id)

  try {
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

itemsRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, description, price, currency = 'EUR' } = request.body

  if (!title || !description || !price) {
    return response.status(400).json({
      error: 'Item description is missing'
    })
  }

  const { userId } = request
  const business = await Business.findById(userId)
  if (!business) {
    return response.status(400).json({
      error: 'Business does´t exist'
    })
  }

  const newItem = new Item({
    title,
    description,
    price,
    currency,
    creationDate: new Date().toISOString(),
    status: 'active',
    business: business._id
  })

  try {
    const savedItem = await newItem.save()
    business.items = business.items.concat(savedItem._id)
    await business.save()

    response.status(201).json(savedItem)
  } catch (error) {
    next(error)
  }
})

itemsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const newItem = request.body

  try {
    const result = await Item.findByIdAndUpdate(id, newItem, { new: true })

    if (result === null) {
      return response.status(400).json({
        error: 'Item does´t exist'
      })
    }

    response.json(result)
  } catch (e) {
    next(e)
  }
})

module.exports = itemsRouter
