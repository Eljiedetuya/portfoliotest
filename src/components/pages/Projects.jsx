import React from 'react'

export default function Projects() {
  const projects = [
    {
      title: 'AI Chatbot Portal',
      description: 'Built an intelligent chatbot system with conversation memory and smart fallback responses. Integrated with Google Generative AI and deployed on Vercel.',
      tech: ['React', 'Node.js', 'Vite', 'Vercel', 'AI/ML'],
      link: 'https://y-woad-phi.vercel.app'
    },
    {
      title: 'Portfolio Dashboard',
      description: 'Designed and built a professional portfolio with route-based navigation, smooth page transitions, and responsive design using React Router.',
      tech: ['React', 'React Router', 'CSS3', 'Responsive'],
      link: '#'
    },
    {
      title: 'Serverless API Architecture',
      description: 'Architected serverless backend with conversation memory, fallback systems, and optimized performance for production-scale applications.',
      tech: ['Node.js', 'Serverless', 'API Design', 'Database'],
      link: '#'
    }
  ]

  return (
    <div>
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: 30, fontWeight: 'bold' }}>Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 25 }}>
          {projects.map((project, idx) => (
            <div key={idx} style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 12,
              padding: 24,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.2)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '600', color: '#1a1a1a' }}>{project.title}</h3>
              <p style={{ margin: '12px 0 16px 0', color: '#666', lineHeight: 1.6, flex: 1 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {project.tech.map(tech => (
                  <span key={tech} style={{
                    padding: '4px 10px',
                    background: '#f0f0f0',
                    color: '#667eea',
                    borderRadius: 4,
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.7'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
