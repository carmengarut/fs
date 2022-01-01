const { Schema, model } = require('mongoose')

const ratingSchema = new Schema({
  fulfilled: String,
  content: String,
  date: Date,
  status: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  deal: {
    type: Schema.Types.ObjectId,
    ref: 'Deal'
  }
})

ratingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Rating = model('Rating', ratingSchema)

module.exports = Rating
