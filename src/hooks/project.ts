import { useAsync } from '@/hooks/use-async'
import ProjectServer, { Project, ProjectReq } from '@/api/project'
import { useEffect, useMemo } from 'react'
import { cleanObject } from '@/utils'
import { useUrlQueryParam } from '@/hooks/url'

export const useProjects = (param?: Partial<ProjectReq>) => {
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(ProjectServer.getProjectList(cleanObject(param)))
  }, [param, run])

  return result
}

export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...params, personId: Number(params.personId) || undefined }),
      [params]
    ),
    setParams,
  ] as const
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}
