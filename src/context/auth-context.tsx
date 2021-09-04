import React, { createContext, ReactNode, useContext, useState } from 'react'
import * as auth from '../auth-provider'
import type { User } from '../pages/ProjectList/SearchPanel'

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = async (form: AuthForm) => {
    const res = await auth.login(form)
    setUser(res)
  }

  const register = async (form: AuthForm) => {
    const res = await auth.register(form)
    setUser(res)
  }

  const logout = () => {
    auth.logout()
    setUser(null)
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
