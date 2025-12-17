import React from 'react'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>Welcome to My Portfolio</h1>
      <p>Your portfolio content goes here</p>

      <Chatbot />
    </div>
  )
}
