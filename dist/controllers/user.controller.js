"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.listUser = exports.LoginUser = exports.registerUser = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _database = _interopRequireDefault(require("../database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerUser = _passport.default.authenticate('local.register', {
  successRedirect: '/user/view',
  failureRedirect: '/register'
});

exports.registerUser = registerUser;

const LoginUser = _passport.default.authenticate('local.login', {
  successRedirect: '/blog/view',
  failureRedirect: '/user'
});

exports.LoginUser = LoginUser;

const listUser = async (req, res) => {
  const users = await _database.default.query('SELECT * FROM users');
  res.render('./auth/view-user', {
    users
  });
};

exports.listUser = listUser;

const deleteUser = async (req, res) => {
  const {
    id
  } = req.params;
  await _database.default.query('DELETE FROM users WHERE id = ?', [id]);
  res.redirect('/user/view');
};

exports.deleteUser = deleteUser;