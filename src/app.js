import express from 'express'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import path, {dirname} from 'path'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import passport from 'passport'
import cors from 'cors'
import dotenv from 'dotenv'
import routeBlogs from './routes/blog.js'
import routeCategory from './routes/category.js'
import routeUser from './routes/user.js'
import routeProyect from './routes/projects.js'
import {fileURLToPath} from 'url'
import './libs/passport.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import multer from 'multer'
dotenv.config()

// INIT
export const app = express()
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/img'))
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
  }
})

app.use(multer({storage}).single('image'))

// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

// ROUTES
app.use('/blog', routeBlogs)
app.use('/category', routeCategory)
app.use('/user', routeUser)
app.use('/project', routeProyect)
app.get('/', (req, res) => {
  res.redirect('/user')
})

// PUBLIC
app.use(express.static(__dirname.concat('/public')))
