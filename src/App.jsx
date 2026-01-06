import React from 'react'
import Hero from './components/Hero'
import WorkExperience from './components/WorkExperience'
import About from './components/pages/About'
import Skills from './components/pages/Skills'
import Projects from './components/pages/Projects'
import Education from './components/pages/Education'
import Hackathons from './components/pages/Hackathons'
import Certifications from './components/pages/Certifications'
import Contact from './components/pages/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import './App.css'

export default function App() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ padding: '40px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <Hero />
        <WorkExperience />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Hackathons />
        <Certifications />
        <Contact />
        <Footer />
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
