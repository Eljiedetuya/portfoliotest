import React from 'react'

export default function About() {
  return (
    <div className="page">
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: 30, fontWeight: 'bold' }}>About Me</h2>
        
        <div style={{ maxWidth: '900px' }}>
          <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: 20 }}>
            I'm a full-stack developer and AI enthusiast passionate about building scalable, production-grade applications that solve real business problems. With a strong foundation in both frontend and backend technologies, I specialize in creating seamless user experiences backed by robust infrastructure.
          </p>

          <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: 20 }}>
            Currently, I'm focused on AI/ML integration, multi-agent architectures, and serverless infrastructure. I believe in writing clean, maintainable code and staying updated with the latest technologies in the ever-evolving tech landscape.
          </p>

          <div style={{ 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: 10,
            padding: 24,
            marginTop: 30
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#667eea', fontWeight: '600' }}>Key Highlights</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#555', lineHeight: 1.8 }}>
              <li>Built production AI systems with conversation memory and intelligent fallback systems</li>
              <li>Designed scalable serverless architectures deployed on Vercel</li>
              <li>Full-stack development using modern tech stack (React, Node.js, TypeScript, Python)</li>
              <li>Strong focus on performance optimization and user experience</li>
              <li>Experience with AI/ML integration and multi-agent systems</li>
            </ul>
          </div>

          <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginTop: 30 }}>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. Let's build something amazing together!
          </p>
        </div>
      </section>
    </div>
  )
}
