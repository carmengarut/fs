export const modalReducer = (state = false, action) => {
  console.log('ACTION', action)
  if (action.type === '@modal/show') {
    return true
  }

  if (action.type === '@modal/hide') {
    return false
  }

  return state
}

export const showModal = content => {
  return {
    type: '@modal/show'
  }
}

export const hideModal = () => {
  return {
    type: '@modal/hide'
  }
}
