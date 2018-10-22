"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var startHour = ' 17:00 PDT';
var endHour = ' 23:59 PDT'; // End monday at 11:59pm

var weeks = [{
  week: 7,
  startDate: (0, _moment.default)('18 Oct 18' + startHour),
  endDate: (0, _moment.default)('22 Oct 18' + endHour)
}, {
  week: 8,
  startDate: (0, _moment.default)('25 Oct 18' + startHour),
  endDate: (0, _moment.default)('29 Oct 18' + endHour)
}, {
  week: 9,
  startDate: (0, _moment.default)('01 Nov 18' + startHour),
  endDate: (0, _moment.default)('05 Nov 18' + endHour)
}, {
  week: 10,
  startDate: (0, _moment.default)('08 Nov 18' + startHour),
  endDate: (0, _moment.default)('12 Nov 18' + endHour)
}, {
  week: 11,
  startDate: (0, _moment.default)('15 Nov 18' + startHour),
  endDate: (0, _moment.default)('19 Nov 18' + endHour)
}, {
  week: 12,
  startDate: (0, _moment.default)('22 Nov 18' + startHour),
  endDate: (0, _moment.default)('26 Nov 18' + endHour)
}, {
  week: 13,
  startDate: (0, _moment.default)('29 Nov 18' + startHour),
  endDate: (0, _moment.default)('03 Dec 18' + endHour)
}, {
  week: 14,
  startDate: (0, _moment.default)('06 Dec 18' + startHour),
  endDate: (0, _moment.default)('10 Dec 18' + endHour)
}, {
  week: 15,
  startDate: (0, _moment.default)('13 Dec 18' + startHour),
  endDate: (0, _moment.default)('17 Dec 18' + endHour)
}, {
  week: 16,
  startDate: (0, _moment.default)('20 Dec 18' + startHour),
  endDate: (0, _moment.default)('24 Dec 18' + endHour)
}, {
  week: 17,
  startDate: (0, _moment.default)('27 Dec 18' + startHour),
  endDate: (0, _moment.default)('31 Dec 18' + endHour)
}];
var _default = {
  findWeekByDate: function findWeekByDate(date) {
    var returnWeek = null;
    weeks.forEach(function (week) {
      console.log('inside week', week);
      console.log(date);

      if ((0, _moment.default)(date).isBetween(week.startDate, week.endDate)) {
        console.log('date', date, 'was in between', week.startDate, week.endDate);
        returnWeek = week;
      }
    });
    return returnWeek;
  }
};
exports.default = _default;