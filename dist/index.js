"use strict";

var _app = require("./app.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // SETTING


_app.app.set('port', process.env.PORT || 3000); // TODO: Change port
// LISTEN


_app.app.listen(_app.app.get('port'));