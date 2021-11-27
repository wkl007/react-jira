import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from '@/context/auth-context'
import { UserReq } from '@/api/user'
import { useAsync } from '@/hooks/use-async'

interface LoginProps {
  onError: (error: Error) => void
}

const Login: FC<LoginProps> = ({ onError }) => {
  const { login } = useAuth()
  const { run, isLoading: loading } = useAsync(undefined, {
    throwOnError: true,
  })

  const handleSubmit = async (values: UserReq) => {
    try {
      await run(login(values))
    } catch (e) {
      onError(e as Error)
    }
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
        <Button block type='primary' htmlType='submit' loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
