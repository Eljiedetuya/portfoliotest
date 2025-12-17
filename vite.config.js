import { defineConfig } from 'vite'

// Proxy /api to local API server running on port 3005
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
