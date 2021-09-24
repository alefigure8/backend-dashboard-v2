const { Router } = require('express');
const router = Router();
const {
    getProject,
    getProjectbyId,
    createProject,
    postProject,
    updateProjectbyId,
    updateProject,
    deleteProject,
    viewProject
} = require('../controllers/project.controller');

const { isLoggedIn } = require('../libs/logged')
const { verifyToken } = require('../middlewares/authjwt');


//API - GET ALL PROJECT
router.get('/all', verifyToken, getProject);

//API - GET JUST ONE BY ID
router.get('/all/:id', verifyToken, getProjectbyId);

//GET PROJECT´S LIST
router.get('/view', isLoggedIn, viewProject);

//GET CREATE PROJECT FORM
router.get('/add', isLoggedIn, createProject);

//POST NEW PROJECT
router.post('/add', isLoggedIn, postProject);

//GET UPDATE PROJECT FORM
router.get('/update/:id', isLoggedIn, updateProjectbyId);

//POST UPDATE
router.post('/update/:id', isLoggedIn, updateProject);

//DELETE PROJECT
router.get('/delete/:id', isLoggedIn, deleteProject);

module.exports = router;