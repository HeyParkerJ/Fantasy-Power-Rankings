import Moment from 'moment';

let startHour = ' 17:00 PDT'
let endHour = ' 23:59 PDT' // End monday at 11:59pm

let weeks = [
  {
   week: 7,
   gamesStartDate: Moment('18 Oct 18'+startHour),
   gamesEndDate: Moment('22 Oct 18'+endHour)
  },
  {
    week: 8,
    gamesStartDate: Moment('25 Oct 18'+startHour),
    gamesEndDate: Moment('29 Oct 18'+endHour)
  },
  {
    week: 9,
    gamesStartDate: Moment('01 Nov 18'+startHour),
    gamesEndDate: Moment('05 Nov 18'+endHour)
  },
  {
    week: 10,
    gamesStartDate: Moment('08 Nov 18'+startHour),
    gamesEndDate: Moment('12 Nov 18'+endHour)
  },
  {
    week: 11,
    gamesStartDate: Moment('15 Nov 18'+startHour),
    gamesEndDate: Moment('19 Nov 18'+endHour)
  },
  {
    week: 12,
    gamesStartDate: Moment('22 Nov 18'+startHour),
    gamesEndDate: Moment('26 Nov 18'+endHour)
  },
  {
    week: 13,
    gamesStartDate: Moment('29 Nov 18'+startHour),
    gamesEndDate: Moment('03 Dec 18'+endHour)
  },
  {
    week: 14,
    gamesStartDate: Moment('06 Dec 18'+startHour),
    gamesEndDate: Moment('10 Dec 18'+endHour)
  },
  {
    week: 15,
    gamesStartDate: Moment('13 Dec 18'+startHour),
    gamesEndDate: Moment('17 Dec 18'+endHour)
  },
  {
    week: 16,
    gamesStartDate: Moment('20 Dec 18'+startHour),
    gamesEndDate: Moment('24 Dec 18'+endHour)
  },
  {
    week: 17,
    gamesStartDate: Moment('27 Dec 18'+startHour),
    gamesEndDate: Moment('31 Dec 18'+endHour)
  },
]

export default {
  isDateDuringGames(date) {
    let returnWeek = null;
    weeks.forEach((week) => {
      if(Moment(date).isBetween(week.gamesStartDate, week.gamesEndDate)) {
        console.log('date', date, 'was in between', week.gamesStartDate, week.gamesEndDate)
        returnWeek = week
      }
    })
    return returnWeek
  }
}
