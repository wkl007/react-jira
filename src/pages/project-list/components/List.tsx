import { FC } from 'react'
import { Project, User } from '../../../api/project'

interface ListProps {
  users: User[]
  list: Project[]
}

const List: FC<ListProps> = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              {users.find((user) => user.id === item.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default List
