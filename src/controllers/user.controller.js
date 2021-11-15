const passport = require('passport')
const mysqlConnection = require('../database')

const registerUser = passport.authenticate('local.register', {
  successRedirect: '/user/view',
  failureRedirect: '/register'
})

const LoginUser = passport.authenticate('local.login', {
  successRedirect: '/blog/view',
  failureRedirect: '/user'
})

const listUser = async (req, res) => {
  const users = await mysqlConnection.query('SELECT * FROM users')
  res.render('./auth/view-user', {users})
}

const deleteUser = async (req, res) => {
  const {id} = req.params
  await mysqlConnection.query('DELETE FROM users WHERE id = ?', [id])
  res.redirect('/user/view')
}

module.exports = {registerUser, LoginUser, listUser, deleteUser}
