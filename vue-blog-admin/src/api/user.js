import axios from '../lib/request'


export const userApi = {
  login: (data) => {
    return axios.post(`/user/login`, data)
  }
}
