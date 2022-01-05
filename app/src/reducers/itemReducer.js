import { createItem, getAllItems, updateItem } from '../services/items'
import { showModal } from './modalReducer'
import { setNotification, removeNotification } from './notificationReducer'

const compareFunction = (objectA, objectB) => {
  return new Date(objectB.date).getTime() - new Date(objectA.date).getTime()
}

const initialState = []

export const itemReducer = (state = initialState, action) => {
  if (action.type === '@items/init') {
    const items = action.payload
    items.sort(compareFunction)
    return items
  }

  if (action.type === '@items/created') {
    return [...state, action.payload]
  }

  // if (action.type === '@items/sign') {
  //   const itemUpdated = action.payload
  //   const items = state.map(item => {
  //     if (item.id === itemUpdated.id) {
  //       return {
  //         ...item,
  //         signedBy: itemUpdated.signedBy
  //       }
  //     }
  //     return item
  //   })
  //   items.sort(compareFunction)
  //   return items
  // }

  if (action.type === '@items/edit') {
    const itemUpdated = action.payload
    const items = state.map(item => {
      if (item.id === itemUpdated.id) {
        return {
          ...item,
          ...itemUpdated
        }
      }
      return item
    })
    items.sort(compareFunction)
    return items
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

export const itemInit = () => {
  return async (dispatch) => {
    const items = await getAllItems()
    dispatch({
      type: '@items/init',
      payload: items
    })
  }
}

export const addNewItem = item => {
  return async (dispatch) => {
    try {
      const newItem = await createItem(item)
      dispatch(setNotification('Item successfully created.'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      dispatch({
        type: '@items/created',
        payload: newItem
      })
    } catch (e) {
      console.error(e)
      console.error(e.message)
    }
  }
}

// export const signItem = (id, users) => {
//   return async (dispatch) => {
//     const itemUpdated = await sign(id, users)
//     dispatch({
//       type: '@items/sign',
//       payload: itemUpdated
//     })
//   }
// }

export const editItem = (id, object) => {
  return async (dispatch) => {
    const itemUpdated = await updateItem(id, object)
    dispatch(showModal())
    dispatch({
      type: '@items/edit',
      payload: itemUpdated
    })
  }
}

// export const removeBlog = id => {
//   return async (dispatch) => {
//     await deleteBlog(id)
//     dispatch({
//       type: '@blogs/deleted',
//       payload: { id }
//     })
//   }
// }
