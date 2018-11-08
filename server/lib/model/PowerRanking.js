"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var PowerRankingSchema = new _mongoose.default.Schema({
  teamId: {
    type: Number,
    required: true
  },
  weekId: {
    type: Number,
    required: true
  },
  rankings: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

var PowerRanking = _mongoose.default.model('PowerRanking', PowerRankingSchema);

var _default = PowerRanking;
exports.default = _default;