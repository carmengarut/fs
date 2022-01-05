import { getAllUsers } from '../services/items'

const initialState = []

export const usersReducer = (state = initialState, action) => {
  if (action.type === '@users/init') {
    const users = action.payload
    return users
  }

  return state
}

export const usersInit = () => {
  return async (dispatch) => {
    console.log('entra')
    const users = await getAllUsers()
    dispatch({
      type: '@users/init',
      payload: users
    })
  }
}
