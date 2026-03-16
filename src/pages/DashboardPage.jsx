import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProject, fetchProjects } from '../api/projects'
import { useProjectStore } from '../store/projectStore'
import { useState } from 'react'
import toast from 'react-hot-toast'

function DashboardPage() {
  const { data } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  const { setActiveProject } = useProjectStore()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'planning',
    priority: 'medium',
    colour: '#2563EB',
  })

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success('Project created')
      setForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        status: 'planning',
        priority: 'medium',
        colour: '#2563EB',
      })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (error) => {
      toast.error(error.message || 'Unable to create project')
    },
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    mutation.mutate(form)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Your Projects</p>
      </div>
      <form className="project-form" onSubmit={onSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} />
        </label>
        <label>
          Description
          <input
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </label>
        <label>
          Start date
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={onChange}
          />
        </label>
        <label>
          End date
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={onChange}
          />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={onChange}>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on_hold">On hold</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={onChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label>
          Colour
          <input
            type="color"
            name="colour"
            value={form.colour}
            onChange={onChange}
          />
        </label>
        <button
          className="primary-button"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'New Project'}
        </button>
      </form>
      <div className="project-grid">
        {(data?.projects || []).map((project) => (
          <button
            key={project.id}
            type="button"
            className="project-card"
            onClick={() => setActiveProject(project)}
          >
            <h3>{project.title}</h3>
            <p>{project.description || 'No description'}</p>
            <span className="project-meta">
              {project.start_date} - {project.end_date}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
