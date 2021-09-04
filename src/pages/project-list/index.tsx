import { FC, useEffect, useState } from 'react'
import SearchPanel from './components/SearchPanel'
import List from './components/List'
import { cleanObject, useDebounce } from '../../utils'
import ProjectServer, { Project, ProjectReq, User } from '../../api/project'

const ProjectList: FC = () => {
  const [params, setParams] = useState<ProjectReq>({
    name: '',
    personId: '',
  })
  const [users, setUsers] = useState<User[]>([])
  const [list, setList] = useState<Project[]>([])

  const debouncedParams = useDebounce(params, 300)

  useEffect(() => {
    ProjectServer.getProjectList(cleanObject(debouncedParams)).then((res) => {
      setList(res)
    })
  }, [debouncedParams])

  useEffect(() => {
    // axios.get(`${apiUrl}/users`).then((res) => {
    //   setUsers(res.data)
    // })
    ProjectServer.getUserList().then((res) => {
      setUsers(res)
    })
  }, [])

  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  )
}

export default ProjectList
