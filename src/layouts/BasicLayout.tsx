import { FC } from 'react'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { ButtonNoPadding, Row } from '@/components/Lib'
import ProjectList from '@/pages/project-list'
import { useAuth } from '@/context/auth-context'
import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'

const BasicLayout: FC = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <ProjectList />
      </Main>
    </Container>
  )
}

export default BasicLayout

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key='logout'>
            <Button onClick={logout} type='link'>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type='link' onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  display: flex;
  overflow: hidden;
`
