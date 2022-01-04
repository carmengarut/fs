const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  title: String,
  description: String, // En un futuro metemos aqui otro modelo que seria el contrato
  image: String,
  creationDate: Date,
  status: String,
  price: Number,
  currency: String,
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = model('Item', itemSchema)

module.exports = Item
