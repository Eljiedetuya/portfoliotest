import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything 👋" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text })
    });

    const data = await res.json();
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          fontSize: 24,
          background: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 300,
            height: 400,
            background: "#111",
            color: "#fff",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000
          }}
        >
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Portfolio AI
          </div>

          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: 8
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 8,
                    background:
                      msg.sender === "user" ? "#2563eb" : "#333"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", padding: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: 6,
                borderRadius: 6,
                border: "none"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: 6,
                padding: "6px 10px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
