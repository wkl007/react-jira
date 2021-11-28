import request from '@/utils/request'

export interface ProjectReq {
  name: string
  personId: number
}

export interface User {
  id: number
  name: string
  organization: string
  ownerId: number
}

export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
}

export default class ProjectServer {
  static getProjectList(params: ProjectReq): Promise<Project[]> {
    return request.request({
      url: '/projects',
      method: 'get',
      params,
    })
  }

  static getUserList(): Promise<User[]> {
    return request.request({
      url: '/users',
      method: 'get',
    })
  }
}
