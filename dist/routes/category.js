"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _categoryController = require("../controllers/category.controller.js");

var _logged = require("../libs/logged.js");

var _authjwt = require("../middlewares/authjwt.js");

const router = (0, _express.Router)(); // GET categories / private

router.get('/all', _authjwt.verifyToken, _categoryController.getCategory); // GET ONLY ONE / private

router.get('/all/:id', _authjwt.verifyToken, _categoryController.getCategorybyId);
router.get('/view', _logged.isLoggedIn, _categoryController.viewCategory); // POST CREATE / PRIVATE

router.post('/add', _logged.isLoggedIn, _categoryController.postCategory); // GET UPADATE / PRIVATE

router.get('/update/:id', _logged.isLoggedIn, _categoryController.updateCategorybyId); // POST UPADATE / PRIVATE

router.post('/update/:id', _logged.isLoggedIn, _categoryController.postCategorybyId); // DELETE / PRIVATE

router.get('/delete/:id', _logged.isLoggedIn, _categoryController.deleteCategory);
var _default = router;
exports.default = _default;