import { FC, useEffect, useState } from 'react'
import { ButtonNoPadding, Row, ScreenContainer } from '@/components/Lib'
import { cleanObject, useDebounce } from '@/utils'
import ProjectServer, { Project, ProjectReq, User } from '@/api/project'
import SearchPanel from './components/SearchPanel'
import List from './components/List'

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
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type='link'>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </ScreenContainer>
  )
}

export default ProjectList
