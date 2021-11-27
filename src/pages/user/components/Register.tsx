import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from '@/context/auth-context'
import { UserReq } from '@/api/user'
import { useAsync } from '@/hooks/use-async'

interface RegisterProps {
  onError: (error: Error) => void
}

const Register: FC<RegisterProps> = ({ onError }) => {
  const { register } = useAuth()
  const { run, isLoading: loading } = useAsync(undefined, {
    throwOnError: false,
  })

  const handleSubmit = async (values: UserReq) => {
    try {
      await run(register(values))
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
      <Form.Item
        name='cpassword'
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('请确认两次输入的密码相同'))
            },
          }),
        ]}
      >
        <Input placeholder='确认密码' type='password' />
      </Form.Item>
      <Form.Item>
        <Button block type='primary' htmlType='submit' loading={loading}>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Register
