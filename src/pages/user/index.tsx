import { FC, useState } from 'react'
import { Card, Divider, Button, Typography } from 'antd'
import styled from '@emotion/styled'
import logo from '@/assets/logo.svg'
import left from '@/assets/left.svg'
import right from '@/assets/right.svg'
import { useDocumentTitle } from '@/utils'
import Login from './components/Login'
import Register from './components/Register'

const User: FC = () => {
  const [isRegister, setRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useDocumentTitle('请登录注册以继续')

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error && (
          <Typography.Text type='danger'>{error?.message}</Typography.Text>
        )}
        <>
          {isRegister ? (
            <Register onError={setError} />
          ) : (
            <Login onError={setError} />
          )}
        </>
        <Divider />
        <Button
          type='link'
          onClick={() => {
            setRegister(!isRegister)
            setError(null)
          }}
        >
          {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

export default User

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`
