import { FC } from 'react'
import { Typography } from 'antd'
import { ButtonNoPadding, Row, ScreenContainer } from '@/components/Lib'
import { useDebounce, useDocumentTitle } from '@/utils'
import SearchPanel from './components/SearchPanel'
import List from './components/List'
import { useProjects, useProjectsSearchParams } from '@/hooks/project'
import { useUsers } from '@/hooks/user'

const ProjectList: FC = () => {
  useDocumentTitle('项目列表', false)

  const [params, setParams] = useProjectsSearchParams()

  const {
    data: list,
    isLoading: loading,
    error,
  } = useProjects(useDebounce(params, 300))
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
