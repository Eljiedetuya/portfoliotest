/**
 * Portfolio Chatbot – Gemini (Generative Language API)
 * ---------------------------------------------------
 * - Uses GOOGLE_API_KEY (Vercel env var)
 * - Uses PROFILE_BIO as persona/context
 * - Falls back to smart local replies if API fails
 * - Includes simple conversation memory
 */

const fetch = global.fetch || require("node-fetch")

/* =========================
   Temporary conversation memory
   (resets on cold start)
========================= */
let conversationHistory = []

/* =========================
   Helpers
========================= */
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", chunk => (body += chunk.toString()))
    req.on("end", () => {
      try {
        resolve(JSON.parse(body))
      } catch {
        resolve({})
      }
    })
    req.on("error", reject)
  })
}

/* =========================
   Gemini API Call
========================= */
async function callGemini(promptText) {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) throw new Error("GOOGLE_API_KEY not configured")

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent" +
    `?key=${encodeURIComponent(apiKey)}`

  const body = {
    contents: [
      {
        parts: [{ text: promptText }]
      }
    ]
  }

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  const json = await resp.json()

  if (!resp.ok) {
    console.error("[Gemini API error]", json)
    throw new Error(`Gemini API error: ${resp.status}`)
  }

  const candidate = json?.candidates?.[0]
  const parts = candidate?.content?.parts || []
  return parts.map(p => p.text || "").join("").trim()
}

/* =========================
   Serverless Handler
========================= */
module.exports = async (req, res) => {
  /* ---- CORS ---- */
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        reply: "Send a POST request with { message }"
      })
    }

    const body = await parseBody(req)
    const message = (body?.message || "").trim()

    if (!message) {
      return res.status(200).json({
        reply: "Please enter a message 🙂"
      })
    }

    if (message.length > 500) {
      return res.status(200).json({
        reply: "Please keep your question short and clear 👍"
      })
    }

    const profile =
      process.env.PROFILE_BIO ||
      "A passionate full-stack developer with experience in React, Node.js, and modern web technologies."

    /* ---- No API key fallback ---- */
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(200).json({
        reply: generateSmartResponse(message, profile)
      })
    }

    /* ---- Conversation memory ---- */
    conversationHistory.push(`User: ${message}`)
    conversationHistory = conversationHistory.slice(-6)

    const prompt = `
You are a professional AI assistant for a personal portfolio website.

RULES:
- Speak as the person (first-person)
- Be friendly, confident, and concise
- Do NOT mention AI, Gemini, or models
- Max 2–3 sentences
- If unsure, politely redirect

PERSON PROFILE:
${profile}

CONVERSATION:
${conversationHistory.join("\n")}

USER QUESTION:
${message}
`

    try {
      const reply = await callGemini(prompt)
      conversationHistory.push(`Assistant: ${reply}`)

      return res.status(200).json({ reply })
    } catch (apiErr) {
      console.error("[Gemini failed]", apiErr.message)
      return res.status(200).json({
        reply: generateSmartResponse(message, profile)
      })
    }
  } catch (err) {
    console.error("[Server error]", err)
    return res.status(500).json({
      error: "Server error",
      details: String(err)
    })
  }
}

/* =========================
   Smart Local Fallback
========================= */
function generateSmartResponse(question, bio) {
  const q = question.toLowerCase()

  if (q.includes("skill") || q.includes("expert")) {
    return "I specialize in full-stack web development, focusing on React, Node.js, APIs, and modern UI/UX. I enjoy building scalable and user-friendly applications."
  }

  if (q.includes("project") || q.includes("work")) {
    return "I’ve worked on full-stack web apps, dashboards, and API-driven systems. Each project helped me improve performance, design, and clean architecture."
  }

  if (q.includes("contact") || q.includes("hire")) {
    return "You can reach out through my contact section or email. I’m open to collaborations, freelance work, and full-time opportunities."
  }

  if (q.includes("frontend") || q.includes("ui")) {
    return "On the frontend, I focus on React, responsive design, accessibility, and clean UI using Tailwind and modern CSS."
  }

  if (q.includes("backend") || q.includes("api")) {
    return "On the backend, I build secure and scalable APIs using Node.js and databases, with attention to performance and maintainability."
  }

  if (q.includes("hello") || q.includes("hi")) {
    return "Hi 👋 Welcome to my portfolio! Feel free to ask about my skills, projects, or experience."
  }

  return "That’s a great question! Feel free to ask about my skills, projects, tech stack, or how to get in touch."
}
