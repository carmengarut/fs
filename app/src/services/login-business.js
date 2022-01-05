import axios from 'axios'
const baseUrl = '/api/login-business/'

export const loginBusiness = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}
