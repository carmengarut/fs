const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const userExtractor = require('../middleware/userExtractor')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const user = await User.findById(id)
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { email, name, surname, password, profileImg } = body

    const saltRounds = 10 // coste de generar el hash, mientras mas alto mas seguro
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const existingUser = await User.findOne({email: email})

    if (!existingUser) {
      
      const user = new User({
        email,
        name,
        surname,
        passwordHash,
        profileImg,
        creationDate: new Date().toISOString(),
      })

      const savedUser = await user.save()

      const userForToken = {
        id: user._id,
        email: user.email
      }

      const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24 * 7
        }
      )

      const userReturned = {
        email: savedUser.email,
        name: savedUser.name,
        surname: savedUser.surname,
        profileImg: savedUser.profileImg,
        orders: savedUser.orders,
        id: savedUser._id,
        token
      }

      response.status(201).json(userReturned)
    } else {
      throw 'Error: User already exists'
    }
    
  } catch (error) {
    console.log(error.name)
    console.log(error.message)
    response.status(400).json(error)
  }
})

usersRouter.put('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  const newObject  = request.body

  try{
    const result = await User.findByIdAndUpdate(id, newObject, { new: true })
    response.json(result)
  } catch(e) {
    console.error(e.name)
    console.error(e.message)
  }
})

module.exports = usersRouter
