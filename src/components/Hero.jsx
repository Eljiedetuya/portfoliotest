import React from 'react'

export default function Hero() {
  return (
    <div className="page">
      <div style={{ marginBottom: 40, paddingBottom: 30, borderBottom: '2px solid #ddd' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
          <div style={{ width: 100, height: 100, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
            EJ
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Hi, I'm Eljie 👋</h1>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '1rem' }}>Full-Stack Developer</p>
            <p style={{ margin: '4px 0 0 0', color: '#999', fontSize: '0.9rem' }}>React • Node.js • Vite • Cloud</p>
          </div>
        </div>
        <p style={{ color: '#555', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>
          I  focus on building practical skills that help businesses grow. My work is centered on understanding business needs, solving real problems, and turning ideas into results. I enjoy working on strategies that improve efficiency, increase revenue, and create long-term value. My goal is simple: help businesses scale smarter and perform better.
        </p>
      </div>
    </div>
  )
}
