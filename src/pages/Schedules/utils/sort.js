import moment from 'moment';
import _sortBy from 'lodash/sortBy';

export function getMonthWeeks(list) {
  let data = list.map((item, i) => {
    const day = moment(item.day);
    const week = day.week();
    const isWeekend = [6, 7].includes(day.isoWeekday());

    return { ...item, week, isWeekend };
  });

  data = _sortBy(data, item => item.day);

  return data;
}