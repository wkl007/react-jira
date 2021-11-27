import { useAsync } from '@/hooks/use-async'
import ProjectServer, { User } from '@/api/project'
import { useEffect } from 'react'

export const useUsers = () => {
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(ProjectServer.getUserList())
  }, [])

  return result
}
