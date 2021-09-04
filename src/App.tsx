import React from 'react'
import { AuthProvider } from './context/auth-context'
import './App.css'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Login />
      </AuthProvider>
    </div>
  )
}

export default App
