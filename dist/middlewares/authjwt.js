"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = _interopRequireDefault(require("../database.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    return _jsonwebtoken.default.verify(token, process.env.SECRET, async function (err, decoded) {
      // calback with error & decoded
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }

      req.id = decoded.id;
      const user = await _database.default.query('SELECT id FROM users WHERE id = ?', [req.id]);
      if (user.length === 0) return res.status(404).json({
        message: 'No user found'
      });
      return next();
    });
  }
};

exports.verifyToken = verifyToken;