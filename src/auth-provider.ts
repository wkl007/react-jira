import { User } from './pages/ProjectList/SearchPanel'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return axios.post(`${apiUrl}/login`, data).then((res) => {
    console.log(res)
    return handleUserResponse(res.data.user)
  })
}

export const register = (data: { username: string; password: string }) => {
  return axios.post(`${apiUrl}/register`, data).then((res) => {
    return handleUserResponse(res.data.user)
  })
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
