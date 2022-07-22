import {app} from './app.js'
import dotenv from 'dotenv'
dotenv.config()

// SETTING
const port = process.env.PORT || 8080

// LISTENING
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

server.on('error', err => {
  console.log(err)
})
