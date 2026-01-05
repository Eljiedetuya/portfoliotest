import React, { useState } from 'react'

const SUGGESTED_QUESTIONS = [
  "What are your main skills?",
  "Tell me about your project experience",
  "What technologies do you specialize in?",
  "How can I contact you?"
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🤖 Hi! I\'m Eljie, ask me anything!' }
  ])
  const [input, setInput] = useState('')

  async function sendMessage(message = null) {
    const userMsg = message || input
    if (!userMsg.trim()) return
    
    const userMsgObj = { sender: 'user', text: userMsg }
    setMessages(prev => [...prev, userMsgObj])
    setInput('')

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error: could not reach API' }])
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ position: 'fixed', bottom: 20, right: 20, width: 60, height: 60, borderRadius: '50%', fontSize: 24, backgroundColor: '#667eea', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div style={{ position: 'fixed', right: 20, bottom: 100, width: 380, maxHeight: 600, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.15)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: 16, borderBottom: '1px solid #eee', fontWeight: 600, fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa' }}>
            <span>🤖 Portfolio AI</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
          </div>

          {/* Messages area */}
          <div style={{ padding: 16, height: 320, overflowY: 'auto', background: '#fafafa', flex: 1 }}>
            {messages.length === 1 ? (
              <div style={{ marginTop: 16 }}>
                <p style={{ color: '#333', fontSize: '0.9rem', marginBottom: 16, fontWeight: '500' }}>Suggested questions:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      style={{ padding: '12px 14px', border: '2px solid #ddd', borderRadius: 20, background: '#fff', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left', transition: 'all 0.2s', color: '#333', fontWeight: '500' }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = '#667eea'
                        e.target.style.background = '#f0f4ff'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderColor = '#ddd'
                        e.target.style.background = '#fff'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left', marginBottom: 12 }}>
                  <span style={{ display: 'inline-block', padding: '10px 14px', borderRadius: 16, background: m.sender === 'user' ? '#667eea' : '#e5e7eb', color: m.sender === 'user' ? '#fff' : '#1f2937', fontSize: '0.95rem', wordWrap: 'break-word', maxWidth: '85%' }}>{m.text}</span>
                </div>
              ))
            )}
          </div>

          {/* Input area */}
          <div style={{ display: 'flex', padding: 12, borderTop: '1px solid #eee', gap: 8, background: '#fff' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              style={{ flex: 1, padding: '10px 12px', borderRadius: 20, border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button onClick={() => sendMessage()} style={{ padding: '10px 14px', borderRadius: 20, background: '#667eea', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>Send</button>
          </div>
        </div>
      )}
    </>
  )
}
