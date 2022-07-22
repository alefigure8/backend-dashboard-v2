import {app} from './app.js'
import http from 'http'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

// CERTIFICATE
const options = {
  key: fs.readFileSync('./certs/server-key.pem'),
  cert: fs.readFileSync('./certs/server-cert.pem')
}

// SETTING
app.set('port', process.env.PORT || 80)

// LISTENING
const server = http.createServer(options, app).listen(app.get('port') || 80)

server.on('error', err => {
  console.log(err)
})
