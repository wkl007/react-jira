import { FC, useState } from 'react'
import { Card } from 'antd'
import Login from './components/Login'
import Register from './components/Register'

const User: FC = () => {
  const [isRegister, setRegister] = useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        <>{isRegister ? <Register /> : <Login />}</>
        <button onClick={() => setRegister(!isRegister)}>
          {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
        </button>
      </Card>
    </div>
  )
}

export default User
