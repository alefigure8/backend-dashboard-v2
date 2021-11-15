const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

// INIT
const app = express()
require('./libs/passport')
app.use(cors())

// SETTINGS
app.set('views', path.join(__dirname, 'views'))
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// MIDDLEWARES
app.use(
  session({
    secret: process.env.SECRET_PASSPORT,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    })
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())
app.disable('etag')

// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

// ROUTES
app.use('/blog', require('./routes/blog'))
app.use('/category', require('./routes/category'))
app.use('/user', require('./routes/user'))
app.use('/project', require('./routes/projects'))
app.get('/', (req, res) => {
  res.redirect('/user')
})

// PUBLIC
app.use(express.static(__dirname.concat('/public')))

module.exports = app
