import { useQuery } from '@tanstack/react-query'
import { fetchAllStudents } from '../api/projects'

function TeacherDashboardPage() {
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: fetchAllStudents,
  })

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Student Overview</p>
      </div>
      <div className="table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Email</span>
          <span>Projects</span>
          <span>Status</span>
        </div>
        {(data?.students || []).map((student) => (
          <div key={student.id} className="table-row">
            <span>{student.screen_name}</span>
            <span>{student.email}</span>
            <span>{student.project_count}</span>
            <span>{student.status}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeacherDashboardPage
