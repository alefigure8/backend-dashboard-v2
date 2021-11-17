<<<<<<< HEAD
const app = require('./app');
require('dotenv').config()

//SETTING
app.set('port', process.env.PORT || 3000);

//LISTEN
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
=======
const app = require('./app')
require('dotenv').config()

// SETTING
app.set('port', process.env.PORT || 3000)

// LISTEN
app.listen(app.get('port'))
>>>>>>> 2e3b59f7ca0af699c74f08e17a7b67313bef80e0
