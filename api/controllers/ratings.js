const ratingsRouter = require('express').Router()
const Deal = require('../models/Deal')
const User = require('../models/User.js')
const Rating = require('../models/Rating')
const userExtractor = require('../middleware/userExtractor')

ratingsRouter.post('/', userExtractor, async (request, response, next) => {
    const { fulfilled, content, recipientId, dealId } = request.body
  
    const { userId } = request
  
    const deal = await Deal.findById(dealId)
    const recipient = await User.findById(recipientId)
  
    if (deal.status !== 'Signed') {
      return response.status(400).json({
        error: 'The deal should be signed by all members before submitting a rating'
      })
    }
  
    const newRating = new Rating({
      fulfilled,
      content,
      date: new Date().toISOString(),
      status: 'New',
      createdBy: userId,
      recipient: recipientId,
      deal: dealId
    })
  
    try {
      const savedRating = await newRating.save()
      deal.ratings = deal.ratings.concat(savedRating._id)
      await deal.save()
      recipient.ratings = recipient.ratings.concat(savedRating._id)
      await recipient.save()
  
      response.status(201).json(savedRating)
    } catch (error) {
      next(error)
    }
  })

  ratingsRouter.get('/', async (request, response) => {
    const ratings = await Rating.find({})
      .populate('createdBy', {
        email: 1,
        name: 1,
        surname: 1
      })
      .populate('recipient', {
        email: 1,
        name: 1,
        surname: 1
      })
  
    response.json(ratings)
  })

  module.exports = ratingsRouter