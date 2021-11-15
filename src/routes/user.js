const {Router} = require('express')
const router = Router()
const {
  registerUser,
  LoginUser,
  listUser,
  deleteUser
} = require('../controllers/user.controller')
const {isLoggedIn} = require('../libs/logged')

// LOGIN VIEW
router.get('/', (req, res) => {
  res.render('./auth/login', {layout: false})
})

// LOGIN
router.post('/', LoginUser)

// REGISTER VIEW
router.get('/register', isLoggedIn, (req, res) => {
  res.render('./auth/register')
})

// REGISTER
router.post('/register', isLoggedIn, registerUser)

// VIEW LIST
router.get('/view', isLoggedIn, listUser)

// DELETE
router.get('/delete/:id', isLoggedIn, deleteUser)

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/user')
})

module.exports = router
