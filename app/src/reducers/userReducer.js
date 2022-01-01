import { login } from '../services/login'
import { register } from '../services/register'
import { editUser, getUser, setToken } from '../services/deals'
import { setNotification, removeNotification } from './notificationReducer'
const initialState = {}

export const userReducer = (state = initialState, action) => {
  if (action.type === '@users/login') {
    const userToSet = action.payload
    return userToSet
  }

  // if (action.type === '@users/get') {
  //   const user = action.payload
  //   return user
  // }

  if (action.type === '@users/set') {
    const userToSet = action.payload
    return userToSet
  }

  if (action.type === '@users/logout') {
    return {}
  }

  if (action.type === '@users/edit') {
    const userEdited = action.payload
    return userEdited
  }

  return state
}

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      console.log('entra reducer')
      const userToSet = await login(credentials)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(userToSet)
      )
      setToken(userToSet.token)
      dispatch({
        type: '@users/login',
        payload: userToSet
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

export const userSet = (userToSet) => {
  return async (dispatch) => {
    try {
      setToken(userToSet.token)
      const user = await getUser(userToSet.id)
      dispatch({
        type: '@users/set',
        payload: user
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('Couldn´t set user'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

export const userLogout = () => {
  setToken(null)
  window.localStorage.removeItem('loggedNoteAppUser')
  return {
    type: '@users/logout'
  }
}

export const userRegister = (userToRegister) => {
  return async (dispatch) => {
    try {
      const userCreated = await register(userToRegister)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(userCreated)
      )
      setToken(userCreated.token)
      dispatch({
        type: '@users/login',
        payload: userCreated
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('User couldn´t be created'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

export const userEdit = (id, userToEdit) => {
  return async (dispatch) => {
    try {
      const userEdited = await editUser(id, userToEdit)
      dispatch({
        type: '@users/edit',
        payload: userEdited
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('User couldn´t be edited'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

// export const userGet = (id) => {
//   return async (dispatch) => {
//     try {
//       const user = await getUser(id)
//       dispatch({
//         type: '@users/get',
//         payload: user
//       })
//     } catch (e) {
//       console.log(e.name)
//       console.log(e.message)
//       dispatch(setNotification('Couldn´t get user'))
//       setTimeout(() => {
//         dispatch(removeNotification())
//       }, 5000)
//     }
//   }
// }
