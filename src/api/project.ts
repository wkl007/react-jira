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
  pin: boolean
  organization: string
  created: number
}

export default class ProjectServer {
  static getUserList(): Promise<User[]> {
    return request.request({
      url: '/users',
      method: 'get',
    })
  }

  static getProjectList(params: ProjectReq): Promise<Project[]> {
    return request.request({
      url: '/projects',
      method: 'get',
      params,
    })
  }

  static getProjectInfo(id?: number): Promise<Project> {
    return request.request({
      url: `/projects/${id}`,
      method: 'get',
    })
  }

  static addProject(params: Partial<Project>): Promise<any> {
    return request.request({
      url: '/projects',
      method: 'post',
      data: params,
    })
  }

  static editProject(params: Partial<Project>): Promise<any> {
    return request.request({
      url: `/projects/${params.id}`,
      method: 'patch',
      data: params,
    })
  }

  static deleteProject(params: Partial<Project>): Promise<any> {
    return request.request({
      url: `/projects/${params.id}`,
      method: 'delete',
    })
  }
}
