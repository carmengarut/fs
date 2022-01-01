const { Schema, model } = require('mongoose')

const dealSchema = new Schema({
  title: String,
  content: String, // En un futuro metemos aqui otro modelo que seria el contrato
  date: Date,
  status: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  signedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }]
})

dealSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Deal = model('Deal', dealSchema)

module.exports = Deal
