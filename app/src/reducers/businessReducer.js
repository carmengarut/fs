import { loginBusiness } from '../services/login-business'
import { registerBusiness } from '../services/register-business'
import { editBusiness, getBusiness, setToken } from '../services/items'
import { setNotification, removeNotification } from './notificationReducer'
const initialState = {}

export const businessReducer = (state = initialState, action) => {
  if (action.type === '@business/login') {
    const businessToSet = action.payload
    return businessToSet
  }

  // if (action.type === '@business/get') {
  //   const business = action.payload
  //   return business
  // }

  if (action.type === '@business/set') {
    const businessToSet = action.payload
    return businessToSet
  }

  if (action.type === '@business/logout') {
    return {}
  }

  if (action.type === '@business/edit') {
    const businessEdited = action.payload
    return businessEdited
  }

  return state
}

export const businessLogin = (credentials) => {
  return async (dispatch) => {
    try {
      console.log('entra reducer')
      const businessToSet = await loginBusiness(credentials)
      window.localStorage.setItem(
        'loggedBusiness', JSON.stringify(businessToSet)
      )
      setToken(businessToSet.token)
      dispatch({
        type: '@business/login',
        payload: businessToSet
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('Wrong credentials'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

export const businessSet = (businessToSet) => {
  return async (dispatch) => {
    try {
      setToken(businessToSet.token)
      const business = await getBusiness(businessToSet.id)
      dispatch({
        type: '@business/set',
        payload: business
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('Couldn´t set business'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

export const businessLogout = () => {
  setToken(null)
  window.localStorage.removeItem('loggedBusiness')
  return {
    type: '@business/logout'
  }
}

export const businessRegister = (businessToRegister) => {
  return async (dispatch) => {
    try {
      const businessCreated = await registerBusiness(businessToRegister)
      window.localStorage.setItem(
        'loggedBusiness', JSON.stringify(businessCreated)
      )
      setToken(businessCreated.token)
      dispatch({
        type: '@business/login',
        payload: businessCreated
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('Business couldn´t be created'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

export const businessEdit = (id, businessToEdit) => {
  return async (dispatch) => {
    try {
      const businessEdited = await editBusiness(id, businessToEdit)
      dispatch({
        type: '@business/edit',
        payload: businessEdited
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('Business couldn´t be edited'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

// export const businessGet = (id) => {
//   return async (dispatch) => {
//     try {
//       const business = await getBusiness(id)
//       dispatch({
//         type: '@business/get',
//         payload: business
//       })
//     } catch (e) {
//       console.log(e.name)
//       console.log(e.message)
//       dispatch(setNotification('Couldn´t get business'))
//       setTimeout(() => {
//         dispatch(removeNotification())
//       }, 5000)
//     }
//   }
// }
