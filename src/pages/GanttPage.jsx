import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api/tasks'
import { fetchMilestones } from '../api/milestones'
import { useProjectStore } from '../store/projectStore'
import { useGantt } from '../hooks/useGantt'
import GanttChart from '../components/gantt/GanttChart'

function GanttPage() {
  const { activeProject } = useProjectStore()
  const { data } = useQuery({
    queryKey: ['tasks', activeProject?.id],
    queryFn: () => fetchTasks(activeProject.id),
    enabled: !!activeProject?.id,
  })
  const { data: milestoneData } = useQuery({
    queryKey: ['milestones', activeProject?.id],
    queryFn: () => fetchMilestones(activeProject.id),
    enabled: !!activeProject?.id,
  })

  if (!activeProject) {
    return <p>Select a project from the dashboard.</p>
  }

  const { columns, bars, milestones, columnCount } = useGantt(
    data?.tasks || [],
    activeProject.start_date,
    activeProject.end_date,
    milestoneData?.milestones || [],
  )

  return (
    <GanttChart
      columns={columns}
      tasks={bars}
      milestones={milestones}
      columnCount={columnCount}
    />
  )
}

export default GanttPage
