import moment from 'moment';
import { locale } from 'utils/defaultLocale';
import { extendMoment } from 'moment-range';

moment.updateLocale(locale, {
  week: {
    dow: 1,
    doy: 4
  }
});

const extendedMoment = extendMoment(moment);
extendedMoment.defaultFormat = 'YYYY-MM-DD';

export function datesEqual(date1, date2) {
  return moment(date1).format() === moment(date2).format();
}

export function getMonthFirstDay(date) {
  return moment(date).startOf('month').format();
}

export function getMonthLastDay(date) {
  return moment(date).endOf('month').format();
}

export function getPreviousMonth(date) {
  return moment(date).subtract(1, 'months');
}

export function getNextMonth(date) {
  return moment(date).add(1, 'months');
}

export function getDayName(day) {
  return moment(day).format('dd');
}

export function getDayOfMonth(day) {
  return moment(day).date();
}

export function isPast(date) {
  return moment().diff(moment(date), 'minutes') >= 0;
}


export function getDaysInWeekRange(week, days) {
  const daysInWeek = [];
  let weekStart = moment(week.start);
  let weekEnd = moment(week.end);

  days.map(date => {
    let day = moment(date.day);
    if (day.isSameOrAfter(weekStart) && day.isSameOrBefore(weekEnd)) {
      daysInWeek.push(date);
    }
    return;
  });
  return daysInWeek;
}

export function getHoursAndMinutes(date) {
  return moment.parseZone(date).local('ru').format('HH:mm');
}

export function isInDayRange(day, dateStart, dateEnd) {
  const dayStart = moment(day).startOf('day');
  const dayEnd = moment(day).endOf('day');

  return moment(dateStart).isAfter(dayStart)
      && moment(dateEnd).isBefore(dayEnd);
}

export function getDuration(start, end) {
  let a = moment(start);
  let b = moment(end);
  return moment.duration(b.diff(a));
}

export function getDifference(date1, date2, timeUnit) {
  let a = moment(date1);
  let b = moment(date2);

  return b.diff(a, timeUnit);
}

export function getMinutes(date) {
  return moment(date).minute();
}

export function getWeekends(day) {
  if (moment(day).isoWeekday() === 6 || moment(day).isoWeekday() === 7) {
    return true;
  }
  return false;
}

export function getSlotStartEndTime(start, end) {
  return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
}

export default moment;
