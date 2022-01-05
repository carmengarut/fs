import axios from 'axios'
const baseUrl = '/api/items'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllItems = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const getItem = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const createItem = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

export const updateItem = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

// export const sign = (id, users) => {
//   const config = {
//     headers: {
//       Authorization: token
//     }
//   }

//   const newObject = {
//     users
//   }
//   const request = axios.put(`${baseUrl}/${id}/sign`, newObject, config)
//   return request.then(response => response.data)
// }

export const addOrder = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post('/api/orders/', newObject, config)
  return request.then(response => response.data)
}

export const getAllOrders = () => {
  const request = axios.get('/api/orders/')
  return request.then(response => response.data)
}

// export const updateTrustRate = (id, trustRate) => {
//   const config = {
//     headers: {
//       Authorization: token
//     }
//   }

//   const newObject = {
//     trustRate
//   }
//   console.log(newObject)
//   const request = axios.put(`/api/users/${id}`, newObject, config)
//   return request.then(response => response.data)
// }

export const getAllUsers = () => {
  const request = axios.get('/api/users')
  return request.then(response => response.data)
}

export const getUser = (id) => {
  const request = axios.get(`/api/users/${id}`)
  return request.then(response => response.data)
}

export const editUser = (id, user) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`/api/users/${id}`, user, config)
  return request.then(response => response.data)
}

// export const inviteUser = (newObject) => {
//   const config = {
//     headers: {
//       Authorization: token
//     }
//   }
//   const request = axios.post('/api/users/invite', newObject, config)
//   return request.then(response => response.data)
// }

export const getAllBusinesses = () => {
  const request = axios.get('/api/businesses')
  return request.then(response => response.data)
}

export const getBusiness = (id) => {
  const request = axios.get(`/api/businesses/${id}`)
  return request.then(response => response.data)
}

export const editBusiness = (id, user) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`/api/businesses/${id}`, user, config)
  return request.then(response => response.data)
}
