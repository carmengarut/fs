import axios from 'axios'
const baseUrl = '/api/users/'

export const register = async userObject => {
  const { data } = await axios.post(baseUrl, userObject, {})
  return data
}
