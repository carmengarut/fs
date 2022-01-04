const ordersRouter = require('express').Router()
const Item = require('../models/Item')
const User = require('../models/User.js')
const Order = require('../models/Order')
const Business = require('../models/Business')
const userExtractor = require('../middleware/userExtractor')

ordersRouter.post('/', userExtractor, async (request, response, next) => {
  const { total, currency = 'EUR', itemsList, businessId } = request.body

  const { userId } = request

  const user = await User.findById(userId)
  const business = await Business.findById(businessId)

  // itemsList.forEach(async (itemId) => {
  //   const item = await Item.findById(itemId)
  //   if (!item) {
  //     return response.status(400).json('Item doesn´t exist')
  //   }
  // })

  const newOrder = new Order({
    total,
    currency,
    date: new Date().toISOString(),
    status: 'New',
    user: userId,
    business: businessId,
    items: itemsList
  })

  try {
    const savedOrder = await newOrder.save()
    itemsList.forEach(async (itemId) => {
      const item = await Item.findById(itemId)
      item.orders = item.orders.concat(savedOrder._id)
      await item.save()
    })

    user.orders = user.orders.concat(savedOrder._id)
    await user.save()

    business.orders = business.orders.concat(savedOrder._id)
    await business.save()

    response.status(201).json(savedOrder)
  } catch (error) {
    response.status(400).json(error)
  }
})

ordersRouter.get('/', async (request, response) => {
  const orders = await Order.find({})
    .populate('business', {
      email: 1,
      name: 1
    })
    .populate('user', {
      email: 1,
      name: 1,
      surname: 1
    })
    .populate('items', {
      title: 1,
      price: 1,
      currency: 1
    })

  response.json(orders)
})

module.exports = ordersRouter
