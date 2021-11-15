const {Router} = require('express')
const router = Router()
const {
  getBlog,
  getEntry,
  createPost,
  formBlog,
  formUpdate,
  postUpdate,
  deleteEntry,
  blogs
} = require('../controllers/blog.controller')

const {isLoggedIn} = require('../libs/logged')
const {verifyToken} = require('../middlewares/authjwt')

// GET ENTRIES / PUBLIC
router.get('/all', verifyToken, getBlog)

// GET ONLY ONE
router.get('/all/:id', verifyToken, getEntry)

// VIEW ENTRIES BLOG
router.get('/view', isLoggedIn, blogs)

// GET CREATE
router.get('/add', isLoggedIn, formBlog)

// POST CREATE / PRIVATE
router.post('/add', isLoggedIn, createPost)

// GET UPADATE / PRIVATE
router.get('/update/:id', isLoggedIn, formUpdate)

// POST UPADATE / PRIVATE
router.post('/update/:id', isLoggedIn, postUpdate)

// DELETE / PRIVATE
router.get('/delete/:id', isLoggedIn, deleteEntry)

module.exports = router
