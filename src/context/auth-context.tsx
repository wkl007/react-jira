import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import UserServer, { User } from '@/api/user'
import { ACCESS_TOKEN } from '@/utils/constants'
import { useAsync } from '@/hooks/use-async'
import { useMount } from '@/utils'
import { FullPageErrorFallback, FullPageLoading } from '@/components/Lib'

interface AuthForm {
  username: string
  password: string
}

const AuthContext = createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => void
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

const getUserInfo = async () => {
  let user = null
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (token) {
    const res = await UserServer.getUserInfo()
    user = res.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>()

  const login = async (form: AuthForm) => {
    const { user } = await UserServer.login(form)
    localStorage.setItem(ACCESS_TOKEN, user.token)
    setUser(user)
  }

  const register = async (form: AuthForm) => {
    const { user } = await UserServer.register(form)
    localStorage.setItem(ACCESS_TOKEN, user.token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    setUser(null)
  }

  useEffect(() => {
    run(getUserInfo())
  }, [run])

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
