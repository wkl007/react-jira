import { FC } from 'react'
import { Table, TableColumnsType, TableProps } from 'antd'
import { Project, User } from '@/api/project'
import { dateFormat } from '@/utils'

interface ListProps extends TableProps<Project> {
  users: User[]
}

const List: FC<ListProps> = ({ users, ...props }) => {
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
      render: (value, record) => (
        <span>{record.created ? dateFormat(record.created) : '暂无'}</span>
      ),
    },
  ]

  return (
    <Table
      bordered
      size='small'
      rowKey='id'
      pagination={false}
      columns={columns}
      {...props}
    />
  )
}

export default List
