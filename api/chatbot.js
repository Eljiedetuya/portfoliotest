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
  const model = 'gemini-1.5-flash'  // Using the latest available Gemini model
  if (!apiKey) throw new Error('GOOGLE_API_KEY not configured')

  const endpoint = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

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

  if (!resp.ok) {
    const txt = await resp.text()
    const err = new Error(`Gemini API error: ${resp.status} ${txt}`)
    err.status = resp.status
    throw err
  }

  const json = await resp.json()
  console.log('[chatbot] Gemini response:', JSON.stringify(json, null, 2))

  // Extract text from the new Gemini API response format
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
    const profile = process.env.PROFILE_BIO || ''

    // Compose final prompt instructing the model to speak as the person
    const prompt = `You are a helpful assistant that answers questions about the following person. Use the information below to answer user questions accurately and in first person as if you are that person. If the question is outside the person's experience, say you don't know.

PROFILE:
${profile}

User question:
${message}

Answer concisely and helpfully:`

    console.log('[chatbot] calling Gemini with prompt length', prompt.length)
    const gen = await callGemini(prompt)
    console.log('[chatbot] Gemini reply length', gen && gen.length)

    return res.status(200).json({ reply: gen })
  } catch (err) {
    console.error('[chatbot] error', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: 'Server error', details: String(err) })
  }
}
