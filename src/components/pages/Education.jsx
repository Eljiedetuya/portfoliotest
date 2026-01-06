import React from 'react'

export default function Education() {
  const education = [
    {
      school: 'Caribbean Technical University of Guyana',
      degree: 'Bachelor of Science in Information Technology',
      period: '2021 - 2025',
      details: 'Focused on software development, system design, and IT infrastructure'
    }
  ]

  return (
    <div>
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: 30, fontWeight: 'bold' }}>Education</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {education.map((edu, idx) => (
            <div key={idx} style={{
              background: '#f9f9f9',
              border: '1px solid #e0e0e0',
              borderRadius: 10,
              padding: 24,
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '600', color: '#1a1a1a' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#667eea', fontWeight: '500' }}>
                    {edu.school}
                  </p>
                  <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>
                    {edu.details}
                  </p>
                </div>
                <div style={{ whiteSpace: 'nowrap', color: '#999', fontSize: '0.9rem' }}>
                  {edu.period}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
