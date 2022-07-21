import {app} from './app.js'
import dotenv from 'dotenv'
dotenv.config()

// SETTING
app.set('port', process.env.PORT || 80)

// LISTEN
app.listen(app.get('port'))
