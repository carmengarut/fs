import axios from 'axios'
const baseUrl = '/api/business/'

export const registerBusiness = async userObject => {
  const { data } = await axios.post(baseUrl, userObject, {})
  return data
}
