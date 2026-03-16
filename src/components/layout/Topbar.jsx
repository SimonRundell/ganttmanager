import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useProjectStore } from '../../store/projectStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getApiBase } from '../../api/client'

function Topbar() {
  const { user, signOut } = useAuthStore()
  const { activeProject } = useProjectStore()
  const navigate = useNavigate()
  const [apiBase, setApiBase] = useState('')

  useEffect(() => {
    getApiBase().then(setApiBase).catch(() => setApiBase(''))
  }, [])

  const handleNewTask = () => {
    if (!activeProject) {
      toast.error('Select a project first')
      navigate('/')
      return
    }
    navigate('/tasks')
  }

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Gantt Dashboard</p>
        <h1>GanttManager</h1>
      </div>
      <div className="topbar-actions">
        <button className="ghost-button" type="button">
          Export PDF
        </button>
        <button className="primary-button" type="button" onClick={handleNewTask}>
          New Task
        </button>
        <div className="profile">
            <div className="avatar">
              {user?.avatar_path && apiBase ? (
                <img
                  src={`${apiBase}/${user.avatar_path}`}
                  alt="User avatar"
                />
              ) : (
                user?.screen_name?.slice(0, 2).toUpperCase() || 'GM'
              )}
            </div>
          <div>
            <p className="profile-name">{user?.screen_name || 'Guest'}</p>
            <p className="profile-role">{user?.role || 'Student'}</p>
          </div>
          {user && (
            <button className="ghost-button" type="button" onClick={signOut}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar
