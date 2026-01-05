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
  const model = process.env.GEMINI_MODEL || 'models/text-bison-001'
  if (!apiKey) throw new Error('GOOGLE_API_KEY not configured')

  const endpoint = `https://generativelanguage.googleapis.com/v1beta2/${model}:generateText?key=${encodeURIComponent(apiKey)}`

  const body = {
    prompt: { text: promptText },
    temperature: 0.2,
    maxOutputTokens: 512
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

  // Try a few common response shapes to extract the generated text
  // Preferred: json.candidates[0].content -> array of { text }
  if (json.candidates && json.candidates.length) {
    const c = json.candidates[0]
    if (c.content && Array.isArray(c.content)) {
      return c.content.map(p => (p.text || p)).join('')
    }
    if (c.output) return c.output
    if (c.text) return c.text
  }

  // Another possible shape
  if (json.output && Array.isArray(json.output) && json.output[0].content) {
    return json.output[0].content.map(p => p.text || p).join('')
  }

  // Fallbacks
  if (json.generatedText) return json.generatedText
  if (json.text) return json.text

  // Last resort: stringify whole response
  return JSON.stringify(json)
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
