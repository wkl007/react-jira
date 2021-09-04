import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL, ACCESS_TOKEN } from './constants'

const request = axios.create({
  baseURL: API_URL,
  timeout: 6000,
  validateStatus: null,
})

// http请求拦截器
request.interceptors.request.use(requestHandler, errorHandler)

// http响应拦截器
request.interceptors.response.use(responseHandler, errorHandler)

/**
 * 请求拦截方法
 * @param config
 */
function requestHandler(
  config: AxiosRequestConfig
): AxiosRequestConfig | Promise<AxiosRequestConfig> {
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (token) config.headers.Authorization = token
  return config
}

/**
 * 响应拦截方法
 * @param response
 */
function responseHandler(response: AxiosResponse) {
  const { data, status } = response
  if (status === 200) {
    return data
  } else {
    if (status === 401) {
      localStorage.removeItem(ACCESS_TOKEN)
      window.location.reload()
    }
    return Promise.reject(data)
  }
}

/**
 * 异常处理方法
 * @param err
 */
function errorHandler(err: AxiosError): Promise<AxiosError> {
  return Promise.reject(err)
}

export default request
