import React from 'react'

export default function WorkExperience() {
  const experiences = [
    {
      company: 'GoTeam',
      title: 'AI Specialist',
      period: 'June 2025 - Present',
      description: 'Building AI agents and automation workflows for internal teams. Streamlining workflows and improving efficiency.',
      location: 'Remote / Virginia Beach, VA'
    },
    {
      company: 'Develop Creativity',
      title: 'Chief Technology Officer',
      period: 'November 2023 - Present',
      description: 'Leading technical strategy and architecture decisions. Overseeing product development and infrastructure.',
      location: 'Remote'
    },
    {
      company: 'Rilis Delivery',
      title: 'Software Engineer',
      period: 'April 2024 - Present',
      description: 'Developing full-stack features and optimizing system performance. Working with modern tech stack.',
      location: 'Remote'
    }
  ]

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: 25, fontWeight: 'bold' }}>Work Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
        {experiences.map((exp, idx) => (
          <div key={idx} style={{ paddingBottom: 20, borderBottom: idx < experiences.length - 1 ? '1px solid #eee' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{exp.title}</h3>
                <p style={{ margin: '4px 0 0 0', color: '#667eea', fontSize: '0.95rem', fontWeight: '500' }}>{exp.company}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#999' }}>{exp.period}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#ccc' }}>{exp.location}</p>
              </div>
            </div>
            <p style={{ margin: '12px 0 0 0', color: '#666', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
