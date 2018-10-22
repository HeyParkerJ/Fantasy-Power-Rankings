"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var PowerRanking = new _mongoose.default.Schema({
  teamId: Number,
  rankings: [{
    teamId: Number
  }],
  date: {
    type: Date,
    default: Date.now
  }
});