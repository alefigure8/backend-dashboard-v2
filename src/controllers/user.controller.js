import passport from 'passport'
import mysqlConnection from '../database.js'

export const registerUser = passport.authenticate('local.register', {
  successRedirect: '/user/view',
  failureRedirect: '/register'
})

export const LoginUser = passport.authenticate('local.login', {
  successRedirect: '/blog/view',
  failureRedirect: '/user'
})

export const listUser = async (req, res) => {
  try {
    const users = await mysqlConnection.query('SELECT * FROM users')
    res.render('./auth/view-user', {users})
  } catch (error) {
    res.status(401).send({
      message: `Error from list user: ${error}`
    })
  }
}

export const deleteUser = async (req, res) => {
  const {id} = req.params
  try {
    await mysqlConnection.query('DELETE FROM users WHERE id = ?', [id])
    res.redirect('/user/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from delete user: ${error}`
    })
  }
}
