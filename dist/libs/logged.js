"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = isLoggedIn;
exports.isNotLoggedin = isNotLoggedin;

require("passport");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/user');
  }
}

function isNotLoggedin(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/user');
  }
}