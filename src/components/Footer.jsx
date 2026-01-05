import React from 'react'

export default function Footer() {
  const socials = [
    { icon: '🏠', label: 'Home', url: '#' },
    { icon: '📄', label: 'Resume', url: '#' },
    { icon: '🐙', label: 'GitHub', url: 'https://github.com' },
    { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: '𝕏', label: 'Twitter', url: 'https://twitter.com' },
    { icon: '📷', label: 'Instagram', url: 'https://instagram.com' },
    { icon: '🎵', label: 'TikTok', url: 'https://tiktok.com' },
    { icon: '☀️', label: 'Theme', url: '#' },
    { icon: '💬', label: 'Chat', url: '#' }
  ]

  return (
    <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #ddd', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }}>
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            title={social.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#f0f0f0',
              color: '#333',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#667eea'
              e.target.style.color = '#fff'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#f0f0f0'
              e.target.style.color = '#333'
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <p style={{ marginTop: 20, color: '#999', fontSize: '0.85rem' }}>© 2025 Eljie Magaso. All rights reserved.</p>
    </div>
  )
}
