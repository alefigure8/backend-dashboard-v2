"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _userController = require("../controllers/user.controller.js");

var _logged = require("../libs/logged.js");

const router = (0, _express.Router)(); // LOGIN VIEW

router.get('/', (req, res) => {
  res.render('./auth/login', {
    layout: false
  });
}); // LOGIN

router.post('/', _userController.LoginUser); // REGISTER VIEW

router.get('/register', _logged.isLoggedIn, (req, res) => {
  res.render('./auth/register');
}); // REGISTER

router.post('/register', _logged.isLoggedIn, _userController.registerUser); // VIEW LIST

router.get('/view', _logged.isLoggedIn, _userController.listUser); // DELETE

router.get('/delete/:id', _logged.isLoggedIn, _userController.deleteUser);
router.get('/logout', _logged.isLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/user');
});
var _default = router;
exports.default = _default;