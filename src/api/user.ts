import request from '@/utils/request'

export interface UserReq {
  username: string
  password: string
}

export interface User {
  id: number
  name: string
  token: string
}

export interface UserResp {
  user: User
}

export default class UserServer {
  static login(data: UserReq): Promise<UserResp> {
    return request.request({
      url: '/login',
      method: 'post',
      data,
    })
  }

  static register(data: UserReq): Promise<UserResp> {
    return request.request({
      url: '/register',
      method: 'post',
      data,
    })
  }

  static getUserInfo(): Promise<UserResp> {
    return request.request({
      url: '/me',
      method: 'get',
    })
  }
}
