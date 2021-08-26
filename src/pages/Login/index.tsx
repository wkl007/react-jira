import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import axios from 'axios'
import { debounce } from 'lodash-es'

const apiUrl = process.env.REACT_APP_API_URL

const Login: FC = () => {
  const [value, setValue] = useState('1')
  const login = (params: { username: string; password: string }) => {
    axios.post(`${apiUrl}/login`, params).then((res) => {
      console.log(res.data)
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLFormElement).value
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value
    login({ username, password })
  }

  const search = useCallback((value: any) => {
    console.log(value)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((callback) => callback(), 1000),
    []
  )

  const debounceSearch = useMemo(
    () => debounce((val) => search(val), 1000),
    [search]
  )

  const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    // debounceSearch(e.target.value);
  }, [])

  useEffect(() => {
    debounceFn(() => search(value))
  }, [debounceFn, search, value])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
      <input type="text" value={value} onChange={change} />
      <Search />
    </form>
  )
}

function Search() {
  const [value, setValue] = useState('')

  const onSearch = useCallback(() => {
    console.log(value)
  }, [value])

  // This is the solution
  const debouncedSearch = useMemo(
    () =>
      debounce((val) => {
        onSearch()
      }, 750),
    [onSearch]
  )

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  return <input type="text" value={value} onChange={handleChange} />
}

export default Login
