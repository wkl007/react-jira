import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from '../../../context/auth-context'
import { UserReq } from '../../../api/user'

const Login: FC = () => {
  const { login } = useAuth()

  const handleSubmit = async (values: UserReq) => {
    await login(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" type="text" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder="密码" type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
