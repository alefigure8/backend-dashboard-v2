import 'passport';

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

export { isLoggedIn, isNotLoggedin };