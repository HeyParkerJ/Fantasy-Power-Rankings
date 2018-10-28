"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var startHour = ' 17:00 PDT';
var weekStartHour = ' 00:00 PDT';
var endHour = ' 23:59 PDT'; // End monday at 11:59pm

var weeks = [{
  week: 7,
  weekStartDate: (0, _moment.default)('16 Oct 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('18 Oct 18' + startHour),
  gamesEndDate: (0, _moment.default)('22 Oct 18' + endHour)
}, {
  week: 8,
  weekStartDate: (0, _moment.default)('23 Oct 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('25 Oct 18' + startHour),
  gamesEndDate: (0, _moment.default)('29 Oct 18' + endHour)
}, {
  week: 9,
  weekStartDate: (0, _moment.default)('30 Oct 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('01 Nov 18' + startHour),
  gamesEndDate: (0, _moment.default)('05 Nov 18' + endHour)
}, {
  week: 10,
  weekStartDate: (0, _moment.default)('06 Nov 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('08 Nov 18' + startHour),
  gamesEndDate: (0, _moment.default)('12 Nov 18' + endHour)
}, {
  week: 11,
  weekStartDate: (0, _moment.default)('13 Nov 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('15 Nov 18' + startHour),
  gamesEndDate: (0, _moment.default)('19 Nov 18' + endHour)
}, {
  week: 12,
  weekStartDate: (0, _moment.default)('20 Nov 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('22 Nov 18' + startHour),
  gamesEndDate: (0, _moment.default)('26 Nov 18' + endHour)
}, {
  week: 13,
  weekStartDate: (0, _moment.default)('27 Nov 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('29 Nov 18' + startHour),
  gamesEndDate: (0, _moment.default)('03 Dec 18' + endHour)
}, {
  week: 14,
  weekStartDate: (0, _moment.default)('04 Dec 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('06 Dec 18' + startHour),
  gamesEndDate: (0, _moment.default)('10 Dec 18' + endHour)
}, {
  week: 15,
  weekStartDate: (0, _moment.default)('11 Dec 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('13 Dec 18' + startHour),
  gamesEndDate: (0, _moment.default)('17 Dec 18' + endHour)
}, {
  week: 16,
  weekStartDate: (0, _moment.default)('18 Dec 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('20 Dec 18' + startHour),
  gamesEndDate: (0, _moment.default)('24 Dec 18' + endHour)
}, {
  week: 17,
  weekStartDate: (0, _moment.default)('25 Dec 18' + weekStartHour),
  gamesStartDate: (0, _moment.default)('27 Dec 18' + startHour),
  gamesEndDate: (0, _moment.default)('31 Dec 18' + endHour)
}];

function isDateDuringGames(date) {
  weeks.forEach(function (week) {
    if ((0, _moment.default)(date).isBetween(week.gamesStartDate, week.gamesEndDate)) {
      console.log('date', date, 'was in between', week.gamesStartDate, week.gamesEndDate);
      return true;
    }
  });
  return false;
}

function determineWeekOfSubmission(date) {
  var isDateDuringGames = this.isDateDuringGames(date);
  var weekOfSubmission;

  if (!isDateDuringGames) {
    weeks.forEach(function (week) {
      if ((0, _moment.default)(date).isBetween(week.weekStartDate, week.gamesEndDate)) {
        weekOfSubmission = week.week;
      }
    });
  } else {
    throw new Error('Not a valid submission time: ' + date);
  }

  return weekOfSubmission;
}

var _default = {
  isDateDuringGames: isDateDuringGames,
  determineWeekOfSubmission: determineWeekOfSubmission
};
exports.default = _default;