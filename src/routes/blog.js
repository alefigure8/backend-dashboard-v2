import {Router} from 'express'
import {
  getBlog,
  getEntry,
  createPost,
  formBlog,
  formUpdate,
  postUpdate,
  deleteEntry,
  blogs,
  deleteImg
} from '../controllers/blog.controller.js'
import {isLoggedIn} from '../libs/logged.js'
import {verifyToken} from '../middlewares/authjwt.js'
import upload from '../middlewares/multer.js'

const router = Router()

// GET ENTRIES / PUBLIC
router.get('/all', verifyToken, getBlog)

// GET ONLY ONE
router.get('/all/:id', verifyToken, getEntry)

// VIEW ENTRIES BLOG
router.get('/view', isLoggedIn, blogs)

// GET CREATE
router.get('/add', isLoggedIn, formBlog)

// POST CREATE / PRIVATE
router.post('/add', isLoggedIn, upload.single('image'), createPost)

// GET UPADATE / PRIVATE
router.get('/update/:id', isLoggedIn, formUpdate)

// POST UPADATE / PRIVATE
router.post('/update/:id', isLoggedIn, upload.single('image'), postUpdate)

// DELETE / PRIVATE
router.get('/delete/:id', isLoggedIn, deleteEntry)

// DELETE / PRIVATE
router.get('/delete/:img', isLoggedIn, deleteImg)

export default router
