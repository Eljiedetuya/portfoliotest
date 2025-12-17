// Simple local API server for development (no dependencies)
const http = require('http')

const PORT = process.env.PORT || 3005

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/chatbot') {
    let body = ''
    req.on('data', chunk => (body += chunk))
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {}
        const message = parsed.message || ''
        const reply = message ? `Echo: ${message}` : 'Hello from the local chatbot!'
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ reply }))
        console.log('[local-api] reply ->', reply)
      } catch (err) {
        console.error('[local-api] parse error', err)
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }
    })
    return
  }

  // basic 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`[local-api] Listening on http://localhost:${PORT}`)
})
