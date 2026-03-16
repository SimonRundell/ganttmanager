import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProjectSummary } from '../api/reports'
import { useProjectStore } from '../store/projectStore'
import { exportElementToPdf } from '../utils/pdfUtils'

function ReportsPage() {
  const { activeProject } = useProjectStore()
  const reportRef = useRef(null)
  const { data } = useQuery({
    queryKey: ['report', activeProject?.id],
    queryFn: () => fetchProjectSummary(activeProject.id),
    enabled: !!activeProject?.id,
  })

  if (!activeProject) {
    return <p>Select a project from the dashboard.</p>
  }

  const onExport = () => {
    if (reportRef.current) {
      exportElementToPdf(reportRef.current, 'project-report.pdf')
    }
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Project Report</p>
        <button className="primary-button" type="button" onClick={onExport}>
          Export PDF
        </button>
      </div>
      <div ref={reportRef} className="report-card">
        <h3>{data?.project?.title}</h3>
        <p>{data?.project?.description}</p>
        <div className="report-grid">
          <div>
            <p className="panel-label">Status</p>
            <p className="panel-value">{data?.project?.status}</p>
          </div>
          <div>
            <p className="panel-label">Timeline</p>
            <p className="panel-value">
              {data?.project?.start_date} - {data?.project?.end_date}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReportsPage
