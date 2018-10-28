import Moment from 'moment';

let startHour = ' 17:00 PDT'
let weekStartHour = ' 00:00 PDT'
let endHour = ' 23:59 PDT' // End monday at 11:59pm

let weeks = [
  {
    week: 7,
    weekStartDate: Moment('16 Oct 18'+weekStartHour),
    gamesStartDate: Moment('18 Oct 18'+startHour),
    gamesEndDate: Moment('22 Oct 18'+endHour)
  },
  {
    week: 8,
    weekStartDate: Moment('23 Oct 18'+weekStartHour),
    gamesStartDate: Moment('25 Oct 18'+startHour),
    gamesEndDate: Moment('29 Oct 18'+endHour)
  },
  {
    week: 9,
    weekStartDate: Moment('30 Oct 18'+weekStartHour),
    gamesStartDate: Moment('01 Nov 18'+startHour),
    gamesEndDate: Moment('05 Nov 18'+endHour)
  },
  {
    week: 10,
    weekStartDate: Moment('06 Nov 18'+weekStartHour),
    gamesStartDate: Moment('08 Nov 18'+startHour),
    gamesEndDate: Moment('12 Nov 18'+endHour)
  },
  {
    week: 11,
    weekStartDate: Moment('13 Nov 18'+weekStartHour),
    gamesStartDate: Moment('15 Nov 18'+startHour),
    gamesEndDate: Moment('19 Nov 18'+endHour)
  },
  {
    week: 12,
    weekStartDate: Moment('20 Nov 18'+weekStartHour),
    gamesStartDate: Moment('22 Nov 18'+startHour),
    gamesEndDate: Moment('26 Nov 18'+endHour)
  },
  {
    week: 13,
    weekStartDate: Moment('27 Nov 18'+weekStartHour),
    gamesStartDate: Moment('29 Nov 18'+startHour),
    gamesEndDate: Moment('03 Dec 18'+endHour)
  },
  {
    week: 14,
    weekStartDate: Moment('04 Dec 18'+weekStartHour),
    gamesStartDate: Moment('06 Dec 18'+startHour),
    gamesEndDate: Moment('10 Dec 18'+endHour)
  },
  {
    week: 15,
    weekStartDate: Moment('11 Dec 18'+weekStartHour),
    gamesStartDate: Moment('13 Dec 18'+startHour),
    gamesEndDate: Moment('17 Dec 18'+endHour)
  },
  {
    week: 16,
    weekStartDate: Moment('18 Dec 18'+weekStartHour),
    gamesStartDate: Moment('20 Dec 18'+startHour),
    gamesEndDate: Moment('24 Dec 18'+endHour)
  },
  {
    week: 17,
    weekStartDate: Moment('25 Dec 18'+weekStartHour),
    gamesStartDate: Moment('27 Dec 18'+startHour),
    gamesEndDate: Moment('31 Dec 18'+endHour)
  },
]

function isDateDuringGames(date) {
  weeks.forEach((week) => {
    if(Moment(date).isBetween(week.gamesStartDate, week.gamesEndDate)) {
      console.log('date', date, 'was in between', week.gamesStartDate, week.gamesEndDate)
      return true
    }
  })
  return false
}

function determineWeekOfSubmission(date) {
  let isDateDuringGames = this.isDateDuringGames(date);
  let weekOfSubmission 

  if(!isDateDuringGames) {
    weeks.forEach((week) => {
      if(Moment(date).isBetween(week.weekStartDate, week.gamesEndDate)) {
        weekOfSubmission = week.week;
      }
    })
  } else {
    throw new Error('Not a valid submission time: '+date)
  }

  return weekOfSubmission
}

export default {
  isDateDuringGames,
  determineWeekOfSubmission,
}
