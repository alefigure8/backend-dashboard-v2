require('passport')

module.exports = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/user')
        }
    },

    isNotLoggedin(req, res, next) {

        if (!req.isAuthenticated()) {
            return next()
        } else {
            return res.redirect('/user')

        }
    }

}