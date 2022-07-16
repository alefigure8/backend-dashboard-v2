import {Router} from 'express'
import {
  getCategory,
  getCategorybyId,
  postCategory,
  updateCategorybyId,
  postCategorybyId,
  deleteCategory,
  viewCategory
} from '../controllers/category.controller.js'

import {isLoggedIn} from '../libs/logged.js'
import {verifyToken} from '../middlewares/authjwt.js'
import upload from '../middlewares/multer.js'
const router = Router()

// GET categories / private
router.get('/all', verifyToken, getCategory)

// GET ONLY ONE / private
router.get('/all/:id', verifyToken, getCategorybyId)

router.get('/view', isLoggedIn, viewCategory)

// POST CREATE / PRIVATE
router.post('/add', isLoggedIn, upload.single('image'), postCategory)

// GET UPADATE / PRIVATE
router.get('/update/:id', isLoggedIn, updateCategorybyId)

// POST UPADATE / PRIVATE
router.post('/update/:id', isLoggedIn, upload.single('image'), postCategorybyId)

// DELETE / PRIVATE
router.get('/delete/:id', isLoggedIn, deleteCategory)

export default router
