import { useState } from "react";
export default async function handler(req, res) {
     const { message } = req.body;

 const res = await fetch("/api/chatbot", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage }),
});

  const data = await response.json();
  res.status(200).json({ reply: data.reply });
}


export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input) return;
    const userMessage = input;
    setMessages([...messages, { type: "user", text: userMessage }]);
    setInput("");

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await res.json();
    setMessages([...messages, { type: "user", text: userMessage }, { type: "bot", text: data.reply }]);
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg p-3 flex flex-col">
      <div className="overflow-y-auto max-h-60 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.type === "user" ? "text-right text-blue-500" : "text-left text-gray-700"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border p-1 flex-grow rounded-l"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me..."
        />
        <button className="bg-blue-500 text-white px-3 rounded-r" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
