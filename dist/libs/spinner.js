"use strict";

module.exports = {
  spinnerOff(req, res, next) {
    res.render('../views/partials/spinner.hbs');
    return next();
  }

};