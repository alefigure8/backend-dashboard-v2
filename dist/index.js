import app from './app.js';
import dotenv from 'dotenv';
dotenv.config(); // SETTING

app.set('port', process.env.PORT || 3000); // TODO: Change port
// LISTEN

app.listen(app.get('port'));