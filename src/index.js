const app = require('./app')
require('dotenv').config()

// SETTING
app.set('port', process.env.PORT || 3000) // TODO: Change port

// LISTEN
app.listen(app.get('port'))
