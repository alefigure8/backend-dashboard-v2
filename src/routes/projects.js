import {Router} from 'express'
import {
  getProject,
  getProjectbyId,
  createProject,
  postProject,
  updateProjectbyId,
  updateProject,
  deleteProject,
  viewProject
} from '../controllers/project.controller.js'

import {isLoggedIn} from '../libs/logged.js'
import {verifyToken} from '../middlewares/authjwt.js'
import upload from '../middlewares/multer.js'
const router = Router()

// API - GET ALL PROJECT
router.get('/all', verifyToken, getProject)

// API - GET JUST ONE BY ID
router.get('/all/:id', verifyToken, getProjectbyId)

// GET PROJECT´S LIST
router.get('/view', isLoggedIn, viewProject)

// GET CREATE PROJECT FORM
router.get('/add', isLoggedIn, createProject)

// POST NEW PROJECT
router.post('/add', isLoggedIn, upload.single('image'), postProject)

// GET UPDATE PROJECT FORM
router.get('/update/:id', isLoggedIn, updateProjectbyId)

// POST UPDATE
router.post('/update/:id', isLoggedIn, upload.single('image'), updateProject)

// DELETE PROJECT
router.get('/delete/:id', isLoggedIn, deleteProject)

export default router
