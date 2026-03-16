import { useAuthStore } from '../../store/authStore'

function Topbar() {
  const { user, signOut } = useAuthStore()

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
        <button className="primary-button" type="button">
          New Task
        </button>
        <div className="profile">
          <div className="avatar">
            {user?.screen_name?.slice(0, 2).toUpperCase() || 'GM'}
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
