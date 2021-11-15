const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const auth = require('../libs/auth')
const mysqlConnection = require('../database')
const jwt = require('jsonwebtoken')

passport.use(
  'local.register',
  new localStrategy(
    {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, user, password, done) => {
      const {name} = req.body
      const newUser = {
        name,
        user,
        password
      }
      newUser.password = await auth.encryptPassword(password)
      const result = await mysqlConnection.query('INSERT INTO users SET ?', [
        newUser
      ])
      newUser.id = result.insertId
      newUser.api_key = jwt.sign({id: newUser.id}, process.env.SECRET, {})
      await mysqlConnection.query('UPDATE users set api_key = ? WHERE id = ?', [
        newUser.api_key,
        newUser.id
      ])
      return done(null, newUser)
    }
  )
)

passport.use(
  'local.login',
  new localStrategy(
    {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, user, password, done) => {
      const rows = await mysqlConnection.query(
        'SELECT * FROM users WHERE user = ?',
        [user]
      )
      if (rows.length > 0) {
        const newUser = rows[0]
        const validPassword = await auth.matchPassword(
          password,
          newUser.password
        )
        if (validPassword) {
          done(null, newUser)
        } else {
          done(null, false)
        }
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const rows = await mysqlConnection.query('SELECT * FROM users WHERE ID = ?', [
    id
  ])
  done(null, rows[0])
})
