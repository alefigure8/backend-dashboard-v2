import {app} from './app.js'
import dotenv from 'dotenv'
dotenv.config()

// SETTING
app.set('port', process.env.PORT || 3000)

// LISTENING
const server = app.listen(app.get('port') || 80, () => {
    console.log('Server listening on port ' + app.get('port'))
})

server.on('error', err => {
  console.log(err)
})
