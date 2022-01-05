import { addOrder, getAllOrders } from '../services/items'
import { setNotification, removeNotification } from './notificationReducer'

const compareFunction = (objectA, objectB) => {
  return objectB.date - objectA.date
}

const initialState = []

export const orderReducer = (state = initialState, action) => {
  if (action.type === '@orders/init') {
    const orders = action.payload
    orders.sort(compareFunction)
    return orders
  }

  if (action.type === '@orders/created') {
    return [...state, action.payload]
  }

  // if (action.type === '@blogs/add_comment') {
  //   console.log(action.payload)
  //   const { savedComment, id } = action.payload
  //   const blogs = state.map(blog => {
  //     if (blog.id === id) {
  //       return {
  //         ...blog,
  //         comments: [...blog.comments, {
  //           content: savedComment.content,
  //           id: savedComment.id
  //         }]
  //       }
  //     }
  //     return blog
  //   })
  //   return blogs
  // }

  // if (action.type === '@blogs/deleted') {
  //   console.log('ha entrado')
  //   const { id } = action.payload
  //   const blogs = state.filter(blog => blog.id !== id)
  //   return blogs
  // }

  return state
}

export const orderInit = () => {
  return async (dispatch) => {
    const orders = await getAllOrders()
    dispatch({
      type: '@orders/init',
      payload: orders
    })
  }
}

export const addNewOrder = (orderObject, newTrustRate) => {
  return async (dispatch) => {
    const savedOrder = await addOrder(orderObject)
    dispatch(setNotification('Order added.'))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch({
      type: '@orders/created',
      payload: savedOrder
    })
  }
}
