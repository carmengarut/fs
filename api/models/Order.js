const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  total: Number,
  currency: String,
  creationDate: Date,
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Order = model('Order', orderSchema)

module.exports = Order
