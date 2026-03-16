function GanttChart({ columns, tasks, milestones, columnCount }) {
  return (
    <div className="gantt-board" style={{ '--gantt-columns': columnCount }}>
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
        <div className="gantt-milestones">
          {(milestones || []).map((milestone) => (
            <div
              key={milestone.id}
              className="gantt-milestone"
              style={{
                gridColumn: `${milestone.gridStart || 1} / span 1`,
              }}
              title={`${milestone.title} (${milestone.target_date})`}
            >
              <span>{milestone.title}</span>
            </div>
          ))}
        </div>
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
              <div
                className="gantt-bar"
                style={{
                  gridColumn: `${task.gridStart} / span ${task.gridSpan}`,
                }}
              >
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
