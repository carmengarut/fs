import { getAllBusinesses } from '../services/items'

const initialState = []

export const businessesReducer = (state = initialState, action) => {
  if (action.type === '@businesses/init') {
    const businesses = action.payload
    return businesses
  }

  return state
}

export const businessesInit = () => {
  return async (dispatch) => {
    console.log('entra')
    const businesses = await getAllBusinesses()
    dispatch({
      type: '@businesses/init',
      payload: businesses
    })
  }
}
