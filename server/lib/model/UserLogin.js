"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var UserSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  teamId: {
    type: Number
  },
  emoji: {
    type: String
  }
});

var UserLogin = _mongoose.default.model('UserLogin', UserSchema);

var _default = UserLogin;
exports.default = _default;