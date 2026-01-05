import React from 'react'
import Chatbot from './components/Chatbot'
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to My Portfolio</h1>
        <p>Full-stack Developer | React | Node.js | Cloud</p>
      </header>
      
      <main className="main-content">
        <section className="about">
          <h2>About Me</h2>
          <p>I'm a passionate developer building modern web applications with cutting-edge technologies. Ask the chatbot about my skills and experience!</p>
        </section>

        <section className="projects">
          <h2>Projects</h2>
          <p>This portfolio showcases my work and is powered by an AI chatbot. Feel free to ask any questions!</p>
        </section>
      </main>

      <Chatbot />
    </div>
  )
}
