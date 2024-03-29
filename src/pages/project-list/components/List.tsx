import { FC } from 'react'
import { Table, TableColumnsType, TableProps } from 'antd'
import { Link } from 'react-router-dom'
import { Project, User } from '@/api/project'
import { dateFormat } from '@/utils'
import Pin from '@/components/Pin'
import { useEditProject } from '@/hooks/project'

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

const List: FC<ListProps> = ({ users, refresh, ...props }) => {
  const { mutate } = useEditProject()

  const pinProject = (id: number) => async (pin: boolean) => {
    await mutate({ id, pin })
    await refresh?.()
  }

  const columns: TableColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render: (value, record) => {
        return (
          <Pin checked={record.pin} onCheckedChange={pinProject(record.id)} />
        )
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (value, record) => (
        <Link to={`projects/${record.id}`}>{record.name}</Link>
      ),
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
