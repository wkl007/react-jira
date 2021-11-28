import type { FC } from 'react'
import { Form, Input } from 'antd'
import { Project, User } from '@/api/project'
import UserSelect from '@/components/UserSelect'

interface SearchPanelProps {
  users: User[]
  params: Partial<Pick<Project, 'name' | 'personId'>>
  setParams: (param: SearchPanelProps['params']) => void
}

const SearchPanel: FC<SearchPanelProps> = ({ users, params, setParams }) => {
  return (
    <Form layout='inline' style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder='项目名'
          type='text'
          value={params.name}
          onChange={(e) =>
            setParams({
              ...params,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName='负责人'
          style={{ width: '200px' }}
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
          placeholder='负责人'
        />
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
