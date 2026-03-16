import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gantt', to: '/gantt' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Resources', to: '/resources' },
  { label: 'Reports', to: '/reports' },
  { label: 'Profile', to: '/profile' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">GM</div>
        <div>
          <p className="brand-name">GanttManager</p>
          <p className="brand-tag">Student Planning Suite</p>
        </div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `nav-item${isActive ? ' is-active' : ''}`
            }
          >
            <span className="nav-dot"></span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-card">
        <p className="sidebar-label">Next milestone</p>
        <p className="sidebar-title">Prototype Review</p>
        <p className="sidebar-meta">Mar 29, 2026</p>
        <button className="ghost-button" type="button">
          View timeline
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
