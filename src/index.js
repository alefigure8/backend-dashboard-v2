import {app} from './app.js'
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

// CERTIFICATE
const options = {
  key: fs.readFileSync('./src/certs/privatekey.pem'),
  cert: fs.readFileSync('./src/certs/server.crt')
}

// SETTING
const port = 443 || 8080

// LISTENING
const server = https.createServer(options, app).listen(port, () => {
  console.log('Server listening on port ' + port)
})

server.on('error', err => {
  console.log(err)
})
