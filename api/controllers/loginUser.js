const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginUserRouter = require('express').Router()
const User = require('../models/User')

loginUserRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { email, password } = body

    const user = await User.findOne({ email })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid user or password'
      })
    }

    const userForToken = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      })

    response.send({
      name: user.name,
      surname: user.surname,
      email: user.email,
      profileImg: user.profileImg,
      trustRate: user.trustRate,
      id: user.id,
      token
    })
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = loginUserRouter
