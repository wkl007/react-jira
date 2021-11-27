import { FC, useState } from 'react'
import { Typography } from 'antd'
import { ButtonNoPadding, Row, ScreenContainer } from '@/components/Lib'
import { useDebounce } from '@/utils'
import { ProjectReq } from '@/api/project'
import SearchPanel from './components/SearchPanel'
import List from './components/List'
import { useProjects } from '@/hooks/project'
import { useUsers } from '@/hooks/user'

const ProjectList: FC = () => {
  const [params, setParams] = useState<ProjectReq>({
    name: '',
    personId: '',
  })

  const debouncedParams = useDebounce(params, 300)

  const { data: list, isLoading: loading, error } = useProjects(debouncedParams)
  const { data: users } = useUsers()

  return (
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type='link'>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error && (
        <Typography.Text type='danger'>{error?.message}</Typography.Text>
      )}
      <List users={users || []} dataSource={list || []} loading={loading} />
    </ScreenContainer>
  )
}

export default ProjectList
