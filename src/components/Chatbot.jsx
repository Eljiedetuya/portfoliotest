import React, { useState } from 'react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything 👋' }
  ])
  const [input, setInput] = useState('')

  async function sendMessage() {
    if (!input.trim()) return
    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
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
        style={{ position: 'fixed', bottom: 20, right: 20, width: 60, height: 60, borderRadius: '50%', fontSize: 24 }}
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div style={{ position: 'fixed', right: 20, bottom: 100, width: 320, maxHeight: 480, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.15)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 600 }}>Portfolio AI</div>
          <div style={{ padding: 12, height: 300, overflowY: 'auto', background: '#fafafa' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left', marginBottom: 8 }}>
                <span style={{ display: 'inline-block', padding: '8px 12px', borderRadius: 12, background: m.sender === 'user' ? '#2563eb' : '#e5e7eb', color: m.sender === 'user' ? '#fff' : '#111' }}>{m.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: 8, borderTop: '1px solid #eee' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
            />
            <button onClick={sendMessage} style={{ marginLeft: 8, padding: '8px 12px', borderRadius: 6 }}>Send</button>
          </div>
        </div>
      )}
    </>
  )
}
