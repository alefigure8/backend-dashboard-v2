const app = require('./app')
require('dotenv').config()

// SETTING
app.set('port', process.env.PORT || 80)

// LISTEN
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})
