import { User } from './pages/project-list/components/SearchPanel'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => {
  window.localStorage.getItem(localStorageKey)
}

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return axios.post(`${apiUrl}/login`, data).then((res) => {
    return handleUserResponse(res.data)
  })
}

export const register = (data: { username: string; password: string }) => {
  return axios.post(`${apiUrl}/register`, data).then((res) => {
    return handleUserResponse(res.data)
  })
}

export const logout = () => {
  window.localStorage.removeItem(localStorageKey)
}
