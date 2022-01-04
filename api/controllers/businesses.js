const bcrypt = require('bcrypt')
const businessesRouter = require('express').Router()
const Business = require('../models/Business')
const jwt = require('jsonwebtoken')
const userExtractor = require('../middleware/userExtractor')

businessesRouter.get('/', async (request, response) => {
  const businesses = await Business.find({})
  response.json(businesses)
})

businessesRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const business = await Business.findById(id)
  response.json(business)
})

businessesRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { email, name, password, profileImg } = body

    const saltRounds = 10 // coste de generar el hash, mientras mas alto mas seguro
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const existingBusiness = await Business.findOne({ email: email })

    if (!existingBusiness) {
      const business = new Business({
        email,
        name,
        passwordHash,
        profileImg,
        status: 'inactive',
        creationDate: new Date().toISOString()
      })

      const savedBusiness = await business.save()

      const businessForToken = {
        id: business._id,
        email: business.email
      }

      const token = jwt.sign(
        businessForToken,
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24 * 7
        }
      )

      const businessReturned = {
        email: savedBusiness.email,
        name: savedBusiness.name,
        profileImg: savedBusiness.profileImg,
        orders: savedBusiness.orders,
        items: savedBusiness.items,
        status: savedBusiness.status,
        id: savedBusiness._id,
        token
      }

      response.status(201).json(businessReturned)
    } else {
      response.status(400).json('Business already exists')
    }
  } catch (error) {
    console.log(error.name)
    console.log(error.message)
    response.status(400).json(error)
  }
})

businessesRouter.put('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  const newObject = request.body

  try {
    const result = await Business.findByIdAndUpdate(id, newObject, { new: true })
    response.json(result)
  } catch (e) {
    console.error(e.name)
    console.error(e.message)
  }
})

module.exports = businessesRouter
