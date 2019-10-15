import Moment from 'moment'

let startHour = ' 17:00 PDT'
let weekStartHour = ' 00:00 PDT'
let endHour = ' 23:59 PDT' // End monday at 11:59pm

let weeks = [
  {
    week: 1,
    weekStartDate: Moment('1 Sep 19' + weekStartHour),
    gamesStartDate: Moment('5 Sep 19' + startHour),
    gamesEndDate: Moment('9 Sep 19' + endHour)
  },
  {
    week: 2,
    weekStartDate: Moment('10 Sep 19' + weekStartHour),
    gamesStartDate: Moment('12 Sep 19' + startHour),
    gamesEndDate: Moment('16 Sep 19' + endHour)
  },
  {
    week: 3,
    weekStartDate: Moment('17 Sep 19' + weekStartHour),
    gamesStartDate: Moment('19 Sep 19' + startHour),
    gamesEndDate: Moment('23 Sep 19' + endHour)
  },
  {
    week: 4,
    weekStartDate: Moment('24 Sep 19' + weekStartHour),
    gamesStartDate: Moment('26 Sep 19' + startHour),
    gamesEndDate: Moment('30 Sep 19' + endHour)
  },
  {
    week: 5,
    weekStartDate: Moment('1 Oct 19' + weekStartHour),
    gamesStartDate: Moment('3 Oct 19' + startHour),
    gamesEndDate: Moment('7 Oct 19' + endHour)
  },
  {
    week: 6,
    weekStartDate: Moment('8 Oct 19' + weekStartHour),
    gamesStartDate: Moment('10 Oct 19' + startHour),
    gamesEndDate: Moment('14 Oct 19' + endHour)
  },
  {
    week: 7,
    weekStartDate: Moment('15 Oct 19' + weekStartHour),
    gamesStartDate: Moment('17 Oct 19' + startHour),
    gamesEndDate: Moment('21 Oct 19' + endHour)
  },
  {
    week: 8,
    weekStartDate: Moment('22 Oct 19' + weekStartHour),
    gamesStartDate: Moment('23 Oct 19' + startHour),
    gamesEndDate: Moment('28 Oct 19' + endHour)
  },
  {
    week: 9,
    weekStartDate: Moment('29 Oct 19' + weekStartHour),
    gamesStartDate: Moment('31 Oct 19' + startHour),
    gamesEndDate: Moment('4 Nov 19' + endHour)
  },
  {
    week: 10,
    weekStartDate: Moment('5 Nov 19' + weekStartHour),
    gamesStartDate: Moment('7 Nov 19' + startHour),
    gamesEndDate: Moment('11 Nov 19' + endHour)
  },
  {
    week: 11,
    weekStartDate: Moment('12 Nov 19' + weekStartHour),
    gamesStartDate: Moment('14 Nov 19' + startHour),
    gamesEndDate: Moment('18 Nov 19' + endHour)
  },
  {
    week: 12,
    weekStartDate: Moment('19 Nov 19' + weekStartHour),
    gamesStartDate: Moment('21 Nov 19' + startHour),
    gamesEndDate: Moment('25 Nov 19' + endHour)
  },
  {
    week: 13,
    weekStartDate: Moment('26 Nov 19' + weekStartHour),
    gamesStartDate: Moment('28 Nov 19' + startHour),
    gamesEndDate: Moment('02 Dec 19' + endHour)
  },
  {
    week: 14,
    weekStartDate: Moment('03 Dec 19' + weekStartHour),
    gamesStartDate: Moment('05 Dec 19' + startHour),
    gamesEndDate: Moment('09 Dec 19' + endHour)
  },
  {
    week: 15,
    weekStartDate: Moment('10 Dec 19' + weekStartHour),
    gamesStartDate: Moment('12 Dec 19' + startHour),
    gamesEndDate: Moment('16 Dec 19' + endHour)
  },
  {
    week: 16,
    weekStartDate: Moment('18 Dec 19' + weekStartHour),
    gamesStartDate: Moment('22 Dec 19' + startHour),
    gamesEndDate: Moment('23 Dec 19' + endHour)
  }
]

function isDateDuringGames(date) {
  let weekIsBetweenGames = false
  weeks.forEach(week => {
    if (Moment(date).isBetween(week.gamesStartDate, week.gamesEndDate)) {
      weekIsBetweenGames = true
    }
  })
  return weekIsBetweenGames
}

function determineWeekOfSubmission(date) {
  let isDateDuringGames = this.isDateDuringGames(date)
  let weekOfSubmission

  console.log('isdateduringgames', isDateDuringGames)
  if (isDateDuringGames) {
    throw new Error('Not a valid submission time: ' + date)
  } else {
    weeks.forEach(week => {
      if (Moment(date).isBetween(week.weekStartDate, week.gamesEndDate)) {
        weekOfSubmission = week.week
      }
    })
  }

  console.log('week of submission', weekOfSubmission)
  return weekOfSubmission
}

export default {
  isDateDuringGames,
  determineWeekOfSubmission
}
