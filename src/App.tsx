import React from 'react'
import { useAuth } from './context/auth-context'
import './App.css'
import User from './pages/user'
import BasicLayout from './layouts/BasicLayout'

function App() {
  const { user } = useAuth()
  return <div className='App'>{user ? <BasicLayout /> : <User />}</div>
}

export default App
