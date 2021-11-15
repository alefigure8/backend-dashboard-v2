const {Router} = require('express')
const router = Router()
const {
  getCategory,
  getCategorybyId,
  postCategory,
  updateCategorybyId,
  postCategorybyId,
  deleteCategory,
  viewCategory
} = require('../controllers/category.controller')

const {isLoggedIn} = require('../libs/logged')
const {verifyToken} = require('../middlewares/authjwt')

// GET categories / private
router.get('/all', verifyToken, getCategory)

// GET ONLY ONE / private
router.get('/all/:id', verifyToken, getCategorybyId)

router.get('/view', isLoggedIn, viewCategory)

// POST CREATE / PRIVATE
router.post('/add', isLoggedIn, postCategory)

// GET UPADATE / PRIVATE
router.get('/update/:id', isLoggedIn, updateCategorybyId)

// POST UPADATE / PRIVATE
router.post('/update/:id', isLoggedIn, postCategorybyId)

// DELETE / PRIVATE
router.get('/delete/:id', isLoggedIn, deleteCategory)

module.exports = router
