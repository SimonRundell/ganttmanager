function GanttChart({ columns, tasks }) {
  return (
    <div className="gantt-board">
      <div className="gantt-header">
        <div className="gantt-header-left">
          <p className="gantt-title">Work Breakdown Structure</p>
          <p className="gantt-subtitle">Dependency view</p>
        </div>
        <div className="gantt-scale">
          {columns.map((col) => (
            <span key={col.key} className="gantt-day">
              {col.label}
            </span>
          ))}
        </div>
      </div>
      <div className="gantt-grid">
        {tasks.map((task) => (
          <div className="gantt-row" key={task.id}>
            <div className="gantt-task">
              <p className="task-id">{task.wbs_code || `Task ${task.id}`}</p>
              <div>
                <p className="task-title">{task.title}</p>
                <p className="task-meta">{task.status}</p>
              </div>
            </div>
            <div className="gantt-track">
              <div className="gantt-bar">
                <span
                  className="gantt-progress"
                  style={{ width: `${task.progress || 0}%` }}
                ></span>
                <span className="gantt-label">{task.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GanttChart
