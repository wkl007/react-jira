import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import UserServer, { User } from '../api/user'
import { ACCESS_TOKEN } from '../utils/constants'

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

  const getUserInfo = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      const { user } = await UserServer.getUserInfo()
      setUser(user)
    }
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

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
