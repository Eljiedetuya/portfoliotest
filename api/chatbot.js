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

    /* =========================
       FINAL PROFILE BIO (APPLIED)
    ========================= */
    const profile =
      process.env.PROFILE_BIO ||
      `I am a passionate full-stack developer and creative with a strong interest in building modern, real-world applications. I work with React, Node.js, and Django to create functional and scalable systems, and I also have experience in graphic design and video editing using Adobe tools such as Photoshop, Illustrator, and Premiere Pro. I enjoy solving problems, designing clean user interfaces, and creating visually engaging content for both web and media platforms.`

    /* ---- No API key fallback ---- */
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(200).json({
        reply: generateSmartResponse(message)
      })
    }

    /* ---- Conversation memory ---- */
    conversationHistory.push(`User: ${message}`)
    conversationHistory = conversationHistory.slice(-6)

    const prompt = `
You are a professional assistant for a personal portfolio website.

RULES:
- Speak in first person as the portfolio owner
- Be confident, friendly, and concise
- Do NOT mention AI, Gemini, or models
- Maximum 2–3 sentences
- If unsure, politely redirect

PROFILE:
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
        reply: generateSmartResponse(message)
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
   IMPROVED SMART RESPONSES
========================= */
function generateSmartResponse(question) {
  const q = question.toLowerCase()

  // 👋 Greeting
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hi! Welcome to my portfolio 👋 Feel free to ask about my development skills, design work, or creative projects."
  }
  // 🤷‍♂️About me  
  if (q.includes("tell me about yourself") || q.includes("about you") || q.includes("tell me about you")) {
    return "My name is Eljie Detuya, and I’m a BSIT student at Cebu Technological University – Ginatilan Extension Campus. I’m interested in full-stack web development, working with React, Node.js, and Django, and I also have skills in graphic design and video editing using Adobe tools such as Photoshop, Illustrator, and Premiere Pro. I enjoy learning by building real-world projects and continuously improving both my technical and creative skills."
  }

  // 🧠 Skills / Expertise
  if (q.includes("skill") || q.includes("expert") || q.includes("what can you do")) {
    return "I’m a full-stack developer and creative with skills in React, Node.js, Django, and API development. I also do graphic design and video editing using Adobe tools like Photoshop, Illustrator, and Premiere Pro."
  }
   
  // 🏗️ Projects / Work
  if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
    return "I’ve worked on full-stack web projects such as POS systems, REST APIs, and interactive websites. Alongside development, I also create visual designs and edited videos to support branding and user engagement."
  }

  // 🎨 Frontend & Design
  if (q.includes("frontend") || q.includes("ui") || q.includes("design")) {
    return "On the frontend, I focus on React, responsive layouts, and clean UI design. My background in graphic design helps me create interfaces that are both functional and visually appealing."
  }

  // 🎬 Video Editing
  if (q.includes("video") || q.includes("editing")) {
    return "I have experience in video editing for digital content using Adobe Premiere Pro and related tools. I enjoy creating clean, engaging videos that support storytelling and branding."
  }

  // 🔧 Backend
  if (q.includes("backend") || q.includes("api") || q.includes("server")) {
    return "For backend development, I build secure and scalable APIs using Node.js and Django. I focus on clean architecture, database design, and system reliability."
  }

  // 💼 Background / Experience
  if (q.includes("experience") || q.includes("background")) {
    return "I’m a motivated developer and creative who learns by building real projects. Combining programming with design and media skills allows me to create complete, well-rounded digital products."
  }

  // 🚀 Passion / Motivation
  if (q.includes("passion") || q.includes("why") || q.includes("love")) {
    return "I enjoy both coding and creative work because they let me turn ideas into real products. I’m passionate about continuous learning, improving my skills, and creating work that looks good and works well."
  }

  // 📧 Contact / Hiring
  if (q.includes("contact") || q.includes("hire") || q.includes("email")) {
    return "I’m open to collaboration, freelance projects, and junior-level opportunities. Feel free to reach out if you’re interested in working together."
  }

  // Default
  return "That’s a great question! Feel free to ask about my development skills, design work, creative projects, or anything else you’d like to know."

}

