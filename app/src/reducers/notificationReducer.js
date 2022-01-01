export const notificationReducer = (state = null, action) => {
  console.log('ACTION', action)
  if (action.type === '@notification/set') {
    return action.payload
  }

  if (action.type === '@notification/remove') {
    return null
  }

  return state
}

export const setNotification = content => {
  return {
    type: '@notification/set',
    payload: content
  }
}

export const removeNotification = () => {
  return {
    type: '@notification/remove'
  }
}
