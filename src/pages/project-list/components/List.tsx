import { FC } from 'react'
import { Table, TableColumnsType } from 'antd'
import { Project, User } from '../../../api/project'

interface ListProps {
  users: User[]
  list: Project[]
}

const List: FC<ListProps> = ({ users, list }) => {
  const columns: TableColumnsType<Project> = [
    {
      title: '姓名',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render: (value, record) => (
        <span>
          {users.find((user) => user.id === record.personId)?.name || '未知'}
        </span>
      ),
    },
    {
      title: '创建时间',
      render: (value, record) => <span>{record.created}</span>,
    },
  ]

  return (
    <Table
      bordered
      size='small'
      rowKey='id'
      pagination={false}
      columns={columns}
      dataSource={list}
    />
  )
}

export default List
