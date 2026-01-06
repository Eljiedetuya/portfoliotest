import React from 'react'

export default function Hero() {
  return (
    <div>
      <div style={{ 
        marginBottom: 60, 
        paddingBottom: 40, 
        borderBottom: '2px solid #eee',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        borderRadius: 12,
        padding: 40
      }}>
        <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', marginBottom: 30 }}>
          <div style={{ 
            width: 120, 
            height: 120, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontSize: '3.5rem', 
            fontWeight: 'bold',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
            flexShrink: 0
          }}>
            EJ
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Hi, I'm Eljie Magaso 👋</h1>
            <p style={{ margin: '12px 0 0 0', color: '#667eea', fontSize: '1.2rem', fontWeight: '600' }}>Full-Stack Developer & AI Enthusiast</p>
            <div style={{ margin: '16px 0 0 0', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['React', 'Node.js', 'TypeScript', 'Python', 'AI/ML', 'Cloud'].map(tech => (
                <span key={tech} style={{ 
                  padding: '6px 12px', 
                  background: '#667eea', 
                  color: '#fff', 
                  borderRadius: 20, 
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <p style={{ color: '#555', lineHeight: 1.8, margin: '20px 0', fontSize: '1rem', maxWidth: '800px' }}>
          I build production-grade AI systems and full-stack applications that solve real business problems. With expertise in cloud infrastructure, multi-agent architectures, and serverless technologies, I help companies scale efficiently and deliver measurable results.
        </p>
        
        <div style={{ display: 'flex', gap: 15, marginTop: 25, flexWrap: 'wrap' }}>
          <a href="mailto:eljie.magaso@example.com" style={{ 
            padding: '12px 24px', 
            background: '#667eea', 
            color: '#fff', 
            borderRadius: 6, 
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s',
            cursor: 'pointer',
            border: 'none'
          }}
          onMouseOver={(e) => { e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'; e.target.style.transform = 'translateY(-2px)' }}
          onMouseOut={(e) => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'translateY(0)' }}
          >
            📧 Get In Touch
          </a>
          <a href="#projects" style={{ 
            padding: '12px 24px', 
            background: 'transparent', 
            color: '#667eea', 
            border: '2px solid #667eea',
            borderRadius: 6, 
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => { e.target.style.background = '#667eea'; e.target.style.color = '#fff' }}
          onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#667eea' }}
          >
            View My Work
          </a>
        </div>
      </div>
    </div>
  )
}
