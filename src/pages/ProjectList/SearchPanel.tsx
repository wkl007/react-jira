import type { Dispatch, FC, SetStateAction } from 'react'

export interface Params {
  name: string
  personId: string
}

export interface User {
  id: number
  name: string
  token: string
}

interface SearchPanelProps {
  users: User[]
  params: Params
  setParams: Dispatch<SetStateAction<Params>>
}

const SearchPanel: FC<SearchPanelProps> = ({ users, params, setParams }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(e) =>
            setParams((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <select
          value={params.personId}
          onChange={(e) =>
            setParams((prevState) => ({
              ...prevState,
              personId: e.target.value,
            }))
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default SearchPanel
