import React from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import WorkExperience from './components/WorkExperience'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import './App.css'

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ marginLeft: 250, padding: '40px 60px', maxWidth: 1200, flex: 1, backgroundColor: '#fff' }}>
        {/* Hero Section */}
        <Hero />

        {/* Work Experience */}
        <WorkExperience />

        {/* About Section */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 20, fontWeight: 'bold' }}>About</h2>
          <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}>
            I specialize in building production AI systems that solve real business problems at scale. My work focuses on multi-agent architectures, AI automation, and serverless infrastructure that consistently delivers double-digit efficiency gains and cost reductions. I've led teams shipping high-uptime platforms handling thousands of daily transactions, and built autonomous AI agents that resolve the majority of tasks without human intervention. I move fast from concept to production, prioritizing measurable impact over complexity.
          </p>
        </section>

        {/* Skills Section */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 20, fontWeight: 'bold' }}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15 }}>
            {['React', 'Node.js', 'TypeScript', 'Python', 'AI/ML', 'Vite', 'Vercel', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'System Design'].map(skill => (
              <div key={skill} style={{ padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, textAlign: 'center', fontSize: '0.9rem', fontWeight: '500' }}>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
