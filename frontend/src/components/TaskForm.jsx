import { useEffect, useState } from 'react'

const EMPTY = { title: '', description: '', priority: 'MEDIUM', dueDate: '', completed: false }

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) setForm({ ...editingTask, dueDate: editingTask.dueDate || '' })
    else setForm(EMPTY)
  }, [editingTask])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Give the task a title.')
      return
    }
    setError('')
    onSubmit({ ...form, dueDate: form.dueDate || null })
    setForm(EMPTY)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          className="task-form__title"
          name="title"
          placeholder="What needs doing?"
          value={form.title}
          onChange={handleChange}
        />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button type="submit" className="btn btn--primary">
          {editingTask ? 'Save' : 'Add task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn--ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
      <textarea
        name="description"
        placeholder="Notes (optional)"
        value={form.description}
        onChange={handleChange}
        rows={2}
      />
      <div className="task-form__due-row">
        <label className="task-form__due-label">
          Due
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </label>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setForm(p => ({ ...p, dueDate: todayISO() }))}>
          Today
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setForm(p => ({ ...p, dueDate: tomorrowISO() }))}>
          Tomorrow
        </button>
        {form.dueDate && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setForm(p => ({ ...p, dueDate: '' }))}>
            Clear date
          </button>
        )}
      </div>
      {error && <p className="task-form__error">{error}</p>}
    </form>
  )
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function tomorrowISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}