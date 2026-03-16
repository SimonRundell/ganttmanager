import { useQuery } from '@tanstack/react-query'
import { fetchResources } from '../api/resources'
import { useProjectStore } from '../store/projectStore'

function ResourcesPage() {
  const { activeProject } = useProjectStore()
  const { data } = useQuery({
    queryKey: ['resources', activeProject?.id],
    queryFn: () => fetchResources(activeProject.id),
    enabled: !!activeProject?.id,
  })

  if (!activeProject) {
    return <p>Select a project from the dashboard.</p>
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Resources</p>
      </div>
      <div className="table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Role</span>
          <span>Rate</span>
        </div>
        {(data?.resources || []).map((resource) => (
          <div key={resource.id} className="table-row">
            <span>{resource.name}</span>
            <span>{resource.role}</span>
            <span>{resource.cost_rate}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResourcesPage
