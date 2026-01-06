import React, { useState, useEffect, useRef } from "react"

const SUGGESTED_QUESTIONS = [
  "What are your main skills?",
  "Tell me about your project experience",
  "What design tools do you use?",
  "What video editing skills do you have?",
  "How can I contact you?"
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m Eljie’s AI assistant. Ask me anything about his skills, projects, or experience."
    }
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  async function sendMessage(message = null) {
    const userMsg = message || input
    if (!userMsg.trim()) return

    const userMsgObj = { sender: "user", text: userMsg }
    setMessages((prev) => [...prev, userMsgObj])
    setInput("")
    setTyping(true)

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      })
      const data = await res.json()

      setTimeout(() => {
        setTyping(false)
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.reply }
        ])
      }, 600)
    } catch (err) {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t connect to the server." }
      ])
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
          borderRadius: "50%",
          fontSize: 26,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
          color: "#fff",
          zIndex: 1000
        }}
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 110,
            width: 390,
            maxHeight: 620,
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: 18,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              fontWeight: 700,
              fontSize: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#e5e7eb"
            }}
          >
            <span>Eljie AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.3rem",
                cursor: "pointer",
                color: "#e5e7eb"
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              padding: 18,
              flex: 1,
              overflowY: "auto",
              background: "rgba(15,23,42,0.9)"
            }}
          >
            {messages.length === 1 && (
              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    color: "#c7d2fe",
                    fontSize: "0.9rem",
                    marginBottom: 14,
                    fontWeight: 500
                  }}
                >
                  Try asking:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        textAlign: "left",
                        color: "#e5e7eb",
                        transition: "all 0.25s"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(99,102,241,0.25)"
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.sender === "user" ? "right" : "left",
                  marginBottom: 12
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "12px 16px",
                    borderRadius: 18,
                    background:
                      m.sender === "user"
                        ? "linear-gradient(135deg, #667eea, #764ba2)"
                        : "rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    maxWidth: "85%",
                    lineHeight: 1.6
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}

            {typing && (
              <div style={{ color: "#a5b4fc", fontSize: "0.85rem" }}>
                Eljie is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: 14,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              gap: 10,
              background: "#0f172a"
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "0.85rem",
                outline: "none",
                background: "transparent",
                color: "#e5e7eb"
              }}
            />
            <button
              onClick={() => sendMessage()}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
