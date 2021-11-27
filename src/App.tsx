import React, { Suspense } from 'react'
import '@/App.css'
import User from '@/pages/user'
import BasicLayout from '@/layouts/BasicLayout'
import { ErrorBoundary } from '@/components/error-boundary'
import { useAuth } from '@/context/auth-context'
import { FullPageErrorFallback, FullPageLoading } from '@/components/Lib'

function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <BasicLayout /> : <User />}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
