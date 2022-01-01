import { addRating, getAllRatings, updateTrustRate } from '../services/deals'
import { setNotification, removeNotification } from './notificationReducer'

const compareFunction = (objectA, objectB) => {
  return objectB.date - objectA.date
}

const initialState = []

export const ratingReducer = (state = initialState, action) => {
  if (action.type === '@ratings/init') {
    const ratings = action.payload
    ratings.sort(compareFunction)
    return ratings
  }

  if (action.type === '@ratings/created') {
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

export const ratingInit = () => {
  return async (dispatch) => {
    const ratings = await getAllRatings()
    dispatch({
      type: '@ratings/init',
      payload: ratings
    })
  }
}

export const addNewRating = (ratingObject, newTrustRate) => {
  return async (dispatch) => {
    const savedRating = await addRating(ratingObject)
    await updateTrustRate(ratingObject.recipientId, newTrustRate)
    dispatch(setNotification('Rating added.'))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch({
      type: '@ratings/created',
      payload: savedRating
    })
  }
}
