import { useEffect, useState } from 'react'
import { taskApi } from './api/taskApi'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import StatsPanel from './components/StatsPanel'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    try {
      setLoading(true)
      const data = await taskApi.getAll()
      setTasks(data)
      setError('')
    } catch (err) {
      setError('Could not reach the server. Is the backend running on port 8080?')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateOrUpdate(form) {
    try {
      if (editingTask) {
        const updated = await taskApi.update(editingTask.id, form)
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))
        setEditingTask(null)
      } else {
        const created = await taskApi.create(form)
        setTasks(prev => [created, ...prev])
      }
    } catch (err) {
      setError('Could not save the task.')
    }
  }

  async function handleToggle(task) {
    const updated = await taskApi.update(task.id, { ...task, completed: !task.completed })
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))
  }

  async function handleDelete(id) {
    await taskApi.remove(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const visibleTasks = filter === 'ALL' ? tasks : tasks.filter(t => t.priority === filter)

  return (
    <div className="app-shell">
      <StatsPanel tasks={tasks} filter={filter} onFilterChange={setFilter} />

      <main className="main-panel">
        <TaskForm
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {error && <p className="banner banner--error">{error}</p>}
        {loading ? (
          <p className="empty-state">Loading tasks…</p>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}
