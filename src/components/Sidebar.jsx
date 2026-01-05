import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {

  const menuItems = [
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'experience', label: 'Work Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚙️' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'hackathons', label: 'Hackathons', icon: '🏆' },
    { id: 'certifications', label: 'Certifications', icon: '✅' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ]

  return (
    <div style={{ width: 250, background: '#f5f5f5', padding: 30, borderRight: '1px solid #ddd', height: '100vh', overflowY: 'auto', position: 'fixed', left: 0, top: 0 }}>
      <h2 style={{ marginTop: 0, fontSize: '1.3rem', marginBottom: 30 }}>Menu</h2>
      <nav>
        {menuItems.map(item => {
          const to = item.id === 'resume' ? '/' : `/${item.id}`
          return (
            <NavLink
              key={item.id}
              to={to}
              style={({ isActive }) => ({
                width: '100%',
                padding: '12px 16px',
                marginBottom: 8,
                border: 'none',
                background: isActive ? '#667eea' : 'transparent',
                color: isActive ? '#fff' : '#333',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: 6,
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 8
              })}
            >
              <span style={{ marginRight: 10 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
