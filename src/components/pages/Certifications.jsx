import React from 'react'

export default function Certifications() {
  const certs = [
    { name: 'React Fundamentals', issuer: 'Frontend Masters', year: 2024 },
    { name: 'Node.js & Backend Development', issuer: 'Udemy', year: 2024 },
    { name: 'Cloud Architecture Basics', issuer: 'AWS Training', year: 2024 }
  ]

  return (
    <div>
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: 30, fontWeight: 'bold' }}>Certifications & Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {certs.map((cert, idx) => (
            <div key={idx} style={{
              background: '#fff',
              border: '2px solid #667eea',
              borderRadius: 10,
              padding: 20,
              textAlign: 'center',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>✅</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontWeight: '600' }}>
                {cert.name}
              </h3>
              <p style={{ margin: '0 0 8px 0', color: '#667eea', fontSize: '0.9rem', fontWeight: '500' }}>
                {cert.issuer}
              </p>
              <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>
                {cert.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
