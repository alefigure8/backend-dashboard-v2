"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _auth = _interopRequireDefault(require("../libs/auth.js"));

var _database = _interopRequireDefault(require("../database.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport.default.use('local.register', new _passportLocal.default.Strategy({
  usernameField: 'user',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, user, password, done) => {
  const {
    name
  } = req.body;
  const newUser = {
    name,
    user,
    password
  };
  newUser.password = await _auth.default.encryptPassword(password);
  const result = await _database.default.query('INSERT INTO users SET ?', [newUser]);
  newUser.id = result.insertId;
  newUser.api_key = _jsonwebtoken.default.sign({
    id: newUser.id
  }, process.env.SECRET, {});
  await _database.default.query('UPDATE users set api_key = ? WHERE id = ?', [newUser.api_key, newUser.id]);
  return done(null, newUser);
}));

_passport.default.use('local.login', new _passportLocal.default.Strategy({
  usernameField: 'user',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, user, password, done) => {
  const rows = await _database.default.query('SELECT * FROM users WHERE user = ?', [user]);

  if (rows.length > 0) {
    const newUser = rows[0];
    const validPassword = await _auth.default.matchPassword(password, newUser.password);

    if (validPassword) {
      done(null, newUser);
    } else {
      done(null, false);
    }
  }
}));

_passport.default.serializeUser((user, done) => {
  done(null, user.id);
});

_passport.default.deserializeUser(async (id, done) => {
  const rows = await _database.default.query('SELECT * FROM users WHERE ID = ?', [id]);
  done(null, rows[0]);
});