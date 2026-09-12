export default function StatsPanel({ tasks, filter, onFilterChange }) {
  const total = tasks.length
  const done = tasks.filter(t => t.completed).length
  const byPriority = ['HIGH', 'MEDIUM', 'LOW'].map(p => ({
    key: p,
    count: tasks.filter(t => t.priority === p).length,
  }))

  return (
    <aside className="stats-panel">
      <h1 className="stats-panel__brand">Ledger</h1>
      <p className="stats-panel__tagline">A running record of what's left to do.</p>

      <div className="stats-panel__block">
        <span className="stats-panel__number">{total}</span>
        <span className="stats-panel__label">total tasks</span>
      </div>
      <div className="stats-panel__block">
        <span className="stats-panel__number">{done}</span>
        <span className="stats-panel__label">completed</span>
      </div>

      <nav className="stats-panel__filters">
        <button
          className={filter === 'ALL' ? 'is-active' : ''}
          onClick={() => onFilterChange('ALL')}
        >
          All tasks
        </button>
        {byPriority.map(({ key, count }) => (
          <button
            key={key}
            className={filter === key ? 'is-active' : ''}
            onClick={() => onFilterChange(key)}
          >
            {key.charAt(0) + key.slice(1).toLowerCase()} <span>{count}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
