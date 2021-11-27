import { FC } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Kanban from '@/pages/kanban'
import Task from '@/pages/task'

const Project: FC = () => {
  return (
    <div>
      <Link to='kanban'>看板</Link>
      <Link to='task'>任务组</Link>
      <Routes>
        <Route path='kanban' element={<Kanban />} />
        <Route path='task' element={<Task />} />
        <Route index element={<Kanban />} />
      </Routes>
    </div>
  )
}

export default Project
