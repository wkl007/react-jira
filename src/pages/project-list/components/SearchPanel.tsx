import type { Dispatch, FC, SetStateAction } from 'react'
import { Input, Form, Select } from 'antd'
import { ProjectReq, User } from '@/api/project'

interface SearchPanelProps {
  users: User[]
  params: ProjectReq
  setParams: Dispatch<SetStateAction<ProjectReq>>
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
            setParams((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params.personId}
          onChange={(value) =>
            setParams((prevState) => ({
              ...prevState,
              personId: value,
            }))
          }
        >
          <Select.Option value=''>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
