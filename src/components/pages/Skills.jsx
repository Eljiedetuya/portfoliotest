import React from 'react'

export default function Skills() {
  const skills = ['React', 'Node.js', 'TypeScript', 'Python', 'AI/ML', 'Vite', 'Vercel', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'System Design']
  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', marginBottom: 20, fontWeight: 'bold' }}>Skills</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15 }}>
        {skills.map(skill => (
          <div key={skill} style={{ padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, textAlign: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}
