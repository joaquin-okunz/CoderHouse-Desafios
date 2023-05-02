import http from 'http'

import app from './app.js'
import { initSocket } from './socket.js'

const PORT = process.env.NODE_PORT || 3000
const ENV = process.env.NODE_ENV || local

const server = http.createServer(app)
initSocket(server)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})