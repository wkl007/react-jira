import { useCallback, useState } from 'react'
import { useMountedRef } from '@/utils'

interface State<T> {
  error: Error | null
  data: T | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  )
}

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  })

  const setData = (data: T) =>
    setState({
      data,
      stat: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    })

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setState({ ...state, stat: 'loading' })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((e) => {
        setError(e)
        if (config.throwOnError) return Promise.reject(e)
        return e
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  }
}
