"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = {};

auth.encryptPassword = async password => {
  const salt = await _bcryptjs.default.genSalt(10);
  const hash = await _bcryptjs.default.hash(password, salt);
  return hash;
};

auth.matchPassword = async (password, savedPassword) => {
  try {
    return await _bcryptjs.default.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

var _default = auth;
exports.default = _default;