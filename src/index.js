import {app} from './app.js'
import https from 'https'
import http from 'http'
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
const port = process.env.PORT || 3000

// LISTENING
const httpsServer = https.createServer(options, app).listen(port, () => {
  console.log('Server listening on port ' + port)
})

httpsServer.on('error', err => {
  console.log(err)
})
