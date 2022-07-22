import {app} from './app.js'
import https from 'https'
import http from 'http'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

// CERTIFICATE
const options = {
  key: fs.readFileSync(path.join('./src/certs/ca.pem')),
  cert: fs.readFileSync(path.join('./src/certs/cert.pem'))
}

// SETTING
const port = process.env.PORT || 3000
const port2 = process.env.PORT2 || 3001

// LISTENING
const httpsServer = https.createServer(options, app).listen(port, () => {
  console.log('Server listening on port ' + port)
})
const httpServer = http.createServer(app).listen(port2, () => {
  console.log('Server listening on port ' + port2)
})

httpsServer.on('error', err => {
  console.log(err)
})

httpServer.on('error', err => {
  console.log(err)
})
