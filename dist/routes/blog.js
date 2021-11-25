"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _blogController = require("../controllers/blog.controller.js");

var _logged = require("../libs/logged.js");

var _authjwt = require("../middlewares/authjwt.js");

const router = (0, _express.Router)(); // GET ENTRIES / PUBLIC

router.get('/all', _authjwt.verifyToken, _blogController.getBlog); // GET ONLY ONE

router.get('/all/:id', _authjwt.verifyToken, _blogController.getEntry); // VIEW ENTRIES BLOG

router.get('/view', _logged.isLoggedIn, _blogController.blogs); // GET CREATE

router.get('/add', _logged.isLoggedIn, _blogController.formBlog); // POST CREATE / PRIVATE

router.post('/add', _logged.isLoggedIn, _blogController.createPost); // GET UPADATE / PRIVATE

router.get('/update/:id', _logged.isLoggedIn, _blogController.formUpdate); // POST UPADATE / PRIVATE

router.post('/update/:id', _logged.isLoggedIn, _blogController.postUpdate); // DELETE / PRIVATE

router.get('/delete/:id', _logged.isLoggedIn, _blogController.deleteEntry); // DELETE / PRIVATE

router.get('/delete/:img', _logged.isLoggedIn, _blogController.deleteImg);
var _default = router;
exports.default = _default;