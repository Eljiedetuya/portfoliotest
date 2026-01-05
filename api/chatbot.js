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
  
  // Common question patterns with context-aware responses
  if (lowerQ.includes('skill') || lowerQ.includes('what can you do') || lowerQ.includes('expertise')) {
    if (bio.includes('React')) return '🎯 I specialize in React, Node.js, and full-stack development. I build scalable web applications with modern JavaScript frameworks. I\'m also experienced with Vite, Vercel deployment, and cloud technologies.'
    if (bio.includes('developer')) return "💻 I'm a full-stack developer with expertise in building modern web applications. I focus on clean code, performance optimization, and user-friendly interfaces. My tech stack includes JavaScript/React, Node.js, and cloud platforms."
    return "🚀 I have strong skills in web development, cloud deployment, and modern frameworks. I'm proficient in React, Node.js, and various DevOps tools. Happy to discuss any specific technology!"
  }
  
  if (lowerQ.includes('experience') || lowerQ.includes('background') || lowerQ.includes('career')) {
    return "📚 I'm an experienced developer passionate about creating efficient and scalable solutions. I've worked on multiple projects ranging from small web apps to large-scale applications. I'm always learning new technologies and staying current with industry trends."
  }
  
  if (lowerQ.includes('hello') || lowerQ.includes('hi') || lowerQ.includes('hey') || lowerQ.includes('greet')) {
    return "👋 Hi there! Welcome to my portfolio! I'm happy to chat about my work, skills, or any tech questions you might have. What would you like to know?"
  }
  
  if (lowerQ.includes('project') || lowerQ.includes('work') || lowerQ.includes('portfolio') || lowerQ.includes('built')) {
    return "🏗️ I've worked on various projects including web applications, full-stack solutions, and cloud-based systems. This portfolio itself is built with React and Vite, deployed on Vercel with a Node.js backend. Each project helped me grow as a developer."
  }
  
  if (lowerQ.includes('contact') || lowerQ.includes('hire') || lowerQ.includes('email') || lowerQ.includes('reach')) {
    return "📧 I'd love to hear from you! Feel free to reach out if you're interested in collaborating on exciting projects or if you have any questions about my work."
  }
  
  if (lowerQ.includes('how') && (lowerQ.includes('make') || lowerQ.includes('build') || lowerQ.includes('create'))) {
    return "🛠️ I approach development methodically - starting with requirements analysis, designing the architecture, then implementing with clean, maintainable code. I use modern tools and frameworks to ensure scalability and performance."
  }
  
  if (lowerQ.includes('why') || lowerQ.includes('passion') || lowerQ.includes('love')) {
    return "❤️ I love solving problems through code and creating solutions that make a difference. There's something rewarding about building applications that people actually use and enjoy. I'm passionate about continuous learning and staying at the cutting edge of web development."
  }
  
  if (lowerQ.includes('tech stack') || lowerQ.includes('tools') || lowerQ.includes('technology') || lowerQ.includes('languages')) {
    return "⚙️ My primary tech stack includes JavaScript/TypeScript, React, Node.js, Express, MongoDB, and cloud platforms like Vercel and Google Cloud. I also work with Vite, Git, Docker, and various other modern development tools."
  }
  
  if (lowerQ.includes('available') || lowerQ.includes('rate') || lowerQ.includes('price') || lowerQ.includes('cost')) {
    return "💼 I'm available for freelance projects and full-time opportunities. Let's discuss your specific needs and requirements to find the best arrangement!"
  }
  
  if (lowerQ.includes('frontend') || lowerQ.includes('ui') || lowerQ.includes('design')) {
    return "🎨 On the frontend, I specialize in React with responsive design, accessibility, and user experience in mind. I use CSS3, Tailwind, and modern UI frameworks to create beautiful and functional interfaces."
  }
  
  if (lowerQ.includes('backend') || lowerQ.includes('api') || lowerQ.includes('server') || lowerQ.includes('database')) {
    return "🔧 For backend development, I build RESTful APIs with Node.js and Express, work with various databases, and handle cloud deployment. I focus on security, scalability, and clean architecture principles."
  }
  
  if (lowerQ.includes('learn') || lowerQ.includes('new') || lowerQ.includes('studying')) {
    return "📖 I'm constantly learning! Currently exploring the latest in AI/ML integration, advanced React patterns, and emerging frameworks. I believe staying updated is crucial in tech."
  }
  
  if (lowerQ.includes('challenge') || lowerQ.includes('difficult') || lowerQ.includes('problem')) {
    return "💪 I enjoy tackling complex problems - from performance optimization to architecture design. I approach challenges methodically, break them down, and find creative solutions. Debugging tricky issues is actually one of my favorite parts!"
  }
  
  // Questions about the chatbot itself
  if (lowerQ.includes('chatbot') || lowerQ.includes('ai') || lowerQ.includes('gemini')) {
    return "🤖 This chatbot is powered by an intelligent response system. It analyzes your questions and provides relevant answers based on my experience and bio. Pretty cool, right?"
  }
  
  // Default response - more helpful than before
  return "That's a great question! Based on what I've shared, I'm a full-stack developer who loves building modern web applications. Feel free to ask more about my skills, experience, projects, tech stack, or anything else you're curious about!"
}
