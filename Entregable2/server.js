import http from 'http'

import app from './app.js'

const server = http.createServer(app)
const PORT = process.env.NODE_PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})