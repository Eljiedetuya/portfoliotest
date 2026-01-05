import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
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
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        {/* Sidebar Navigation */}
        <Sidebar />

        <div style={{ marginLeft: 250, padding: '40px 60px', maxWidth: 1200, flex: 1, backgroundColor: '#fff' }}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/experience" element={<WorkExperience />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<Hero />} />
          </Routes>

          {/* Footer always shown under route content */}
          <Footer />
        </div>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}
