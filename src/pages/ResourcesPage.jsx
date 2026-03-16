import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createResource,
  deleteResource,
  fetchResources,
  updateResource,
} from '../api/resources'
import { useProjectStore } from '../store/projectStore'
import { useState } from 'react'
import toast from 'react-hot-toast'

function ResourcesPage() {
  const { activeProject } = useProjectStore()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    name: '',
    role: '',
    cost_rate: '',
    notes: '',
  })
  const [editingId, setEditingId] = useState(null)
  const { data } = useQuery({
    queryKey: ['resources', activeProject?.id],
    queryFn: () => fetchResources(activeProject.id),
    enabled: !!activeProject?.id,
  })

  const createMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      toast.success('Resource added')
      setForm({ name: '', role: '', cost_rate: '', notes: '' })
      queryClient.invalidateQueries({ queryKey: ['resources', activeProject?.id] })
    },
    onError: (error) => toast.error(error.message || 'Unable to add resource'),
  })

  const updateMutation = useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      toast.success('Resource updated')
      setEditingId(null)
      setForm({ name: '', role: '', cost_rate: '', notes: '' })
      queryClient.invalidateQueries({ queryKey: ['resources', activeProject?.id] })
    },
    onError: (error) => toast.error(error.message || 'Unable to update resource'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      toast.success('Resource removed')
      queryClient.invalidateQueries({ queryKey: ['resources', activeProject?.id] })
    },
    onError: (error) => toast.error(error.message || 'Unable to delete resource'),
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const payload = { ...form, project_id: activeProject.id }
    if (editingId) {
      updateMutation.mutate({ ...payload, id: editingId })
    } else {
      createMutation.mutate(payload)
    }
  }

  const onEdit = (resource) => {
    setEditingId(resource.id)
    setForm({
      name: resource.name || '',
      role: resource.role || '',
      cost_rate: resource.cost_rate || '',
      notes: resource.notes || '',
    })
  }

  const onDelete = (resource) => {
    deleteMutation.mutate({
      id: resource.id,
      project_id: activeProject.id,
    })
  }

  if (!activeProject) {
    return <p>Select a project from the dashboard.</p>
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Resources</p>
      </div>
      <form className="resource-form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} />
        </label>
        <label>
          Role
          <input name="role" value={form.role} onChange={onChange} />
        </label>
        <label>
          Rate
          <input name="cost_rate" value={form.cost_rate} onChange={onChange} />
        </label>
        <label>
          Notes
          <input name="notes" value={form.notes} onChange={onChange} />
        </label>
        <button
          className="primary-button"
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {editingId ? 'Update Resource' : 'Add Resource'}
        </button>
        {editingId && (
          <button
            className="ghost-button"
            type="button"
            onClick={() => {
              setEditingId(null)
              setForm({ name: '', role: '', cost_rate: '', notes: '' })
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Role</span>
          <span>Rate</span>
          <span>Actions</span>
        </div>
        {(data?.resources || []).map((resource) => (
          <div key={resource.id} className="table-row">
            <span>{resource.name}</span>
            <span>{resource.role}</span>
            <span>{resource.cost_rate}</span>
            <span className="table-actions">
              <button
                className="ghost-button icon-button"
                type="button"
                onClick={() => onEdit(resource)}
                aria-label="Edit resource"
                title="Edit"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              <button
                className="ghost-button icon-button"
                type="button"
                onClick={() => onDelete(resource)}
                disabled={deleteMutation.isPending}
                aria-label="Delete resource"
                title="Delete"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M6 6l1 14h10l1-14" />
                </svg>
              </button>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResourcesPage
