import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from '../../../context/auth-context'
import { UserReq } from '../../../api/user'

const Register: FC = () => {
  const { register } = useAuth()

  const handleSubmit = async (values: UserReq) => {
    await register(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name='username'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder='用户名' type='text' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder='密码' type='password' />
      </Form.Item>
      <Form.Item>
        <Button block type='primary' htmlType='submit'>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Register
