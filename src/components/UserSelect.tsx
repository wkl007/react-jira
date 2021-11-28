import { ComponentProps, FC } from 'react'
import { useUsers } from '@/hooks/user'
import IdSelect from '@/components/IdSelect'

const UserSelect: FC<ComponentProps<typeof IdSelect>> = (props) => {
  const { data: users } = useUsers()
  return <IdSelect options={users || []} {...props} />
}

export default UserSelect
