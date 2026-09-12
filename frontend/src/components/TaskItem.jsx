const PRIORITY_LABEL = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High' }

function formatDueDate(dueDate) {
  if (!dueDate) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return { text: 'Today', tone: 'due-today' }
  if (diffDays === 1) return { text: 'Tomorrow', tone: 'due-soon' }
  if (diffDays < 0) return { text: `Overdue · ${due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`, tone: 'due-overdue' }
  if (diffDays <= 6) return { text: due.toLocaleDateString(undefined, { weekday: 'short' }), tone: 'due-soon' }
  return { text: due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), tone: 'due-later' }
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const due = formatDueDate(task.dueDate)

  return (
    <li className={`task-row task-row--${task.priority.toLowerCase()}`}>
      <button
        className={`task-row__check ${task.completed ? 'is-checked' : ''}`}
        onClick={() => onToggle(task)}
        aria-label={task.completed ? 'Mark as not done' : 'Mark as done'}
      />
      <div className="task-row__body">
        <p className={`task-row__title ${task.completed ? 'is-done' : ''}`}>{task.title}</p>
        {task.description && <p className="task-row__desc">{task.description}</p>}
      </div>
      {due && <span className={`task-row__due task-row__due--${due.tone}`}>{due.text}</span>}
      <span className="task-row__priority">{PRIORITY_LABEL[task.priority]}</span>
      <div className="task-row__actions">
        <button className="btn btn--ghost btn--sm" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn--ghost btn--sm" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  )
}