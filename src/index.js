const app = require('./app')
require('dotenv').config()

// SETTING
app.set('port', process.env.PORT || 80 || 3000)

// LISTEN
app.listen(app.get('port'))
