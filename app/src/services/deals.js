import axios from 'axios'
const baseUrl = '/api/deals'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const getDeal = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

export const updateContract = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export const sign = (id, users) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const newObject = {
    users
  }
  const request = axios.put(`${baseUrl}/${id}/sign`, newObject, config)
  return request.then(response => response.data)
}

export const addRating = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post('/api/ratings/', newObject, config)
  return request.then(response => response.data)
}

export const getAllRatings = () => {
  const request = axios.get('/api/ratings/')
  return request.then(response => response.data)
}

export const updateTrustRate = (id, trustRate) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const newObject = {
    trustRate
  }
  console.log(newObject)
  const request = axios.put(`/api/users/${id}`, newObject, config)
  return request.then(response => response.data)
}

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

export const inviteUser = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post('/api/users/invite', newObject, config)
  return request.then(response => response.data)
}
