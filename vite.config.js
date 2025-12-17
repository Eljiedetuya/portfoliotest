const { defineConfig } = require('vite')

module.exports = defineConfig({
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
