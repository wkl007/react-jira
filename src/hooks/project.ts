import { useAsync } from '@/hooks/use-async'
import ProjectServer, { Project, ProjectReq } from '@/api/project'
import { useEffect } from 'react'
import { cleanObject } from '@/utils'

export const useProjects = (param?: Partial<ProjectReq>) => {
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(ProjectServer.getProjectList(cleanObject(param)))
  }, [param])

  return result
}
