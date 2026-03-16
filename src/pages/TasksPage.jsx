import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api/tasks'
import { useProjectStore } from '../store/projectStore'

function TasksPage() {
  const { activeProject } = useProjectStore()
  const { data } = useQuery({
    queryKey: ['tasks', activeProject?.id],
    queryFn: () => fetchTasks(activeProject.id),
    enabled: !!activeProject?.id,
  })

  if (!activeProject) {
    return <p>Select a project from the dashboard.</p>
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Task List</p>
      </div>
      <div className="table">
        <div className="table-row table-head">
          <span>WBS</span>
          <span>Title</span>
          <span>Start</span>
          <span>End</span>
          <span>Progress</span>
        </div>
        {(data?.tasks || []).map((task) => (
          <div key={task.id} className="table-row">
            <span>{task.wbs_code}</span>
            <span>{task.title}</span>
            <span>{task.start_date}</span>
            <span>{task.end_date}</span>
            <span>{task.progress}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TasksPage
