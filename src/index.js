import {app} from './app.js'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

// SETTING
const port = process.env.PORT || 3000

const httpServer = http.createServer(app).listen(port, () => {
  console.log('Server listening on port ' + port)
})

httpServer.on('error', err => {
  console.log(err)
})
