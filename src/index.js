import {app} from './app.js'
import http from 'http'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

// CERTIFICATE
const options = {
  key: fs.createReadStream('src/certs/server.key'),
  cert: fs.createReadStream('src/certs/server.cert')
}

// SETTING
app.set('port', process.env.PORT || 8080)

// LISTENING
const server = http
  .createServer(options, app)
  .listen(app.get('port') || 80, () => {
    console.log('Server listening on port ' + app.get('port'))
  })

server.on('error', err => {
  console.log(err)
})
