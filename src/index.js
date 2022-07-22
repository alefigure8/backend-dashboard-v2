import {app} from './app.js'
import https from 'https'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

// CERTIFICATE
const options = {
  key: fs.readFileSync(path.join('./src/certs/server-key.pem')),
  cert: fs.readFileSync(path.join('./src/certs/server-cert.pem'))
}

// SETTING
const port = 443

// LISTENING
const server = https.createServer(options, app).listen(port, () => {
  console.log('Server listening on port ' + port)
})

server.on('error', err => {
  console.log(err)
})

