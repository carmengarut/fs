
const { Schema, model } = require('mongoose')

const businessSchema = new Schema({
  email: String,
  name: String,
  passwordHash: String,
  profileImg: String,
  creationDate: Date,
  status: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
})

businessSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Business = model('Business', businessSchema)

module.exports = Business
