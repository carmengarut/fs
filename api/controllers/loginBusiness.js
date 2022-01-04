const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginBusinessRouter = require('express').Router()
const Business = require('../models/Business')

loginBusinessRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { email, password } = body

    const business = await Business.findOne({ email })

    const passwordCorrect = business === null
      ? false
      : await bcrypt.compare(password, business.passwordHash)

    if (!(business && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid business or password'
      })
    }

    const businessForToken = {
      id: business._id,
      email: business.email
    }

    const token = jwt.sign(
      businessForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      })

    response.send({
      name: business.name,
      surname: business.surname,
      email: business.email,
      profileImg: business.profileImg,
      trustRate: business.trustRate,
      id: business.id,
      token
    })
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = loginBusinessRouter
