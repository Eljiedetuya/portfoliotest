import React from 'react'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'Vite', 'CSS3', 'Responsive Design']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'APIs', 'Serverless', 'Database Design']
    },
    {
      category: 'AI & ML',
      skills: ['Python', 'AI/ML', 'GenAI', 'Multi-Agent Systems', 'Automation']
    },
    {
      category: 'DevOps & Cloud',
      skills: ['Vercel', 'AWS', 'Docker', 'Git', 'CI/CD']
    },
    {
      category: 'Tools & Methodologies',
      skills: ['System Design', 'Agile', 'Git', 'TDD', 'Code Review']
    }
  ]

  return (
    <div>
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: 30, fontWeight: 'bold' }}>Skills & Expertise</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: 10,
              padding: 20
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#667eea', fontSize: '1.1rem', fontWeight: '600' }}>
                {cat.category}
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{
                    padding: '8px 14px',
                    background: '#fff',
                    color: '#333',
                    border: '1px solid #e0e0e0',
                    borderRadius: 6,
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
