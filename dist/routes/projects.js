"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _projectController = require("../controllers/project.controller.js");

var _logged = require("../libs/logged.js");

var _authjwt = require("../middlewares/authjwt.js");

const router = (0, _express.Router)(); // API - GET ALL PROJECT

router.get('/all', _authjwt.verifyToken, _projectController.getProject); // API - GET JUST ONE BY ID

router.get('/all/:id', _authjwt.verifyToken, _projectController.getProjectbyId); // GET PROJECT´S LIST

router.get('/view', _logged.isLoggedIn, _projectController.viewProject); // GET CREATE PROJECT FORM

router.get('/add', _logged.isLoggedIn, _projectController.createProject); // POST NEW PROJECT

router.post('/add', _logged.isLoggedIn, _projectController.postProject); // GET UPDATE PROJECT FORM

router.get('/update/:id', _logged.isLoggedIn, _projectController.updateProjectbyId); // POST UPDATE

router.post('/update/:id', _logged.isLoggedIn, _projectController.updateProject); // DELETE PROJECT

router.get('/delete/:id', _logged.isLoggedIn, _projectController.deleteProject);
var _default = router;
exports.default = _default;