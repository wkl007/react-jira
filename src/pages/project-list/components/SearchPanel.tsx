import type { Dispatch, FC, SetStateAction } from 'react'
import { Input, Form, Select } from 'antd'
import { ProjectReq, User } from '@/api/project'

interface SearchPanelProps {
  users: User[]
  params: Partial<Pick<ProjectReq, 'name' | 'personId'>>
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
        <Select
          style={{ width: '200px' }}
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
          placeholder='负责人'
        >
          <Select.Option value=''>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
