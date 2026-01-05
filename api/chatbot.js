// Serverless function that answers questions about you using Gemini (Generative Language API).
// Behavior:
// - If `process.env.GOOGLE_API_KEY` is present, calls the Generative Language API (Gemini/text-bison style)
// - Use `process.env.PROFILE_BIO` as the persona/context about you (set this in Vercel env vars)
// - If no API key configured, falls back to a local echo reply (so the dev UI still works)

const fetch = global.fetch || require('node-fetch')

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (e) {
        resolve({})
      }
    })
    req.on('error', reject)
  })
}

async function callGemini(promptText) {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) throw new Error('GOOGLE_API_KEY not configured')

  // Use the newer v1beta REST API endpoint for text generation
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`

  const body = {
    contents: [
      {
        parts: [
          {
            text: promptText
          }
        ]
      }
    ]
  }

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const json = await resp.json()
  
  if (!resp.ok) {
    console.error('[chatbot] API error:', json)
    throw new Error(`Gemini API error: ${resp.status}`)
  }

  // Extract text from the Gemini API response
  if (json.candidates && json.candidates.length > 0) {
    const candidate = json.candidates[0]
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      return candidate.content.parts.map(p => p.text || '').join('')
    }
  }

  return 'Sorry, I could not generate a response.'
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    console.log('[chatbot] incoming', req.method, req.url)
    if (req.method !== 'POST') {
      return res.status(200).json({ reply: 'Send a POST with { message } to get a reply.' })
    }

    const body = await parseBody(req)
    const message = (body && body.message) || ''

    // If no API key configured, return a helpful fallback so dev UX works.
    if (!process.env.GOOGLE_API_KEY) {
      const reply = message ? `Echo: ${message}` : 'Hello from the chatbot — send a message!'
      console.log('[chatbot] no GOOGLE_API_KEY, replying with fallback', reply)
      return res.status(200).json({ reply })
    }

    // Build persona/context from environment variable
    const profile = process.env.PROFILE_BIO || 'A helpful developer.'

    // Try calling Gemini API
    try {
      const prompt = `You are a helpful assistant. Answer this question based on the person's background:

PERSON'S BIO:
${profile}

QUESTION:
${message}

Answer concisely in 2-3 sentences.`

      console.log('[chatbot] Calling Gemini API...')
      const gen = await callGemini(prompt)
      console.log('[chatbot] Gemini reply:', gen)
      return res.status(200).json({ reply: gen })
    } catch (apiErr) {
      console.error('[chatbot] Gemini API failed:', apiErr.message)
      
      // Fallback: Generate smart response without API
      const smartReply = generateSmartResponse(message, profile)
      console.log('[chatbot] Using fallback reply:', smartReply)
      return res.status(200).json({ reply: smartReply })
    }
  } catch (err) {
    console.error('[chatbot] error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: 'Server error', details: String(err) })
  }
}

function generateSmartResponse(question, bio) {
  const lowerQ = question.toLowerCase()
  
  // Common question patterns
  if (lowerQ.includes('skill') || lowerQ.includes('what can you do')) {
    if (bio.includes('React')) return '🎯 I specialize in React, Node.js, and full-stack development. I build scalable web applications and enjoy working with modern JavaScript frameworks.'
    if (bio.includes('developer')) return "💻 I'm a full-stack developer with expertise in building modern web applications. I focus on clean code and user-friendly interfaces."
    return "🚀 I have strong skills in web development, cloud deployment, and modern frameworks. Feel free to ask me anything about my experience!"
  }
  
  if (lowerQ.includes('experience') || lowerQ.includes('background')) {
    return "📚 I'm an experienced developer passionate about creating efficient and scalable solutions. I love learning new technologies and staying updated with industry trends."
  }
  
  if (lowerQ.includes('hello') || lowerQ.includes('hi') || lowerQ.includes('hey')) {
    return "👋 Hi there! I'm happy to chat. Feel free to ask me about my skills, experience, or projects!"
  }
  
  if (lowerQ.includes('project') || lowerQ.includes('work')) {
    return "🏗️ I've worked on various projects ranging from web applications to cloud-based solutions. Each project taught me valuable lessons in architecture and best practices."
  }
  
  if (lowerQ.includes('contact') || lowerQ.includes('hire')) {
    return "📧 Feel free to reach out if you'd like to collaborate! I'm always interested in exciting projects and opportunities."
  }
  
  // Default response
  return "That's a great question! I'm here to help. Let me know if you'd like to know more about my skills, experience, or any specific projects."
}
