import React from 'react'

export default function Contact() {
  return (
    <div>
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: 30, fontWeight: 'bold' }}>Get In Touch</h2>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: 12,
          padding: 40,
          maxWidth: 600,
          margin: '0 auto'
        }}>
          <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: 30, textAlign: 'center' }}>
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <a href="mailto:eljie.magaso@example.com" style={{
              padding: '14px 24px',
              background: '#667eea',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: '600',
              textAlign: 'center',
              transition: 'all 0.3s',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = 'none'
              e.target.style.transform = 'translateY(0)'
            }}
            >
              📧 Send Email
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
              padding: '14px 24px',
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: '600',
              textAlign: 'center',
              transition: 'all 0.3s',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#667eea'
              e.target.style.color = '#fff'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = '#667eea'
            }}
            >
              💼 Connect on LinkedIn
            </a>
          </div>

          <p style={{ marginTop: 30, color: '#999', fontSize: '0.9rem', textAlign: 'center' }}>
            Response time: Usually within 24 hours
          </p>
        </div>
      </section>
    </div>
  )
}
