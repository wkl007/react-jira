import { FC } from 'react'
import ProjectList from '../pages/project-list'
import { useAuth } from '../context/auth-context'

const BasicLayout: FC = () => {
  const { logout } = useAuth()
  return (
    <>
      <button onClick={logout}>退出登录</button>
      <ProjectList />
    </>
  )
}

export default BasicLayout
