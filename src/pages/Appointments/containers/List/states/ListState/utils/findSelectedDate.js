import moment, { getDayOfMonth } from 'utils/moment';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';

function findSelectedDate(monthlySlots, selectedDate) {

  if (selectedDate && monthlySlots.get(selectedDate.format())) {
    return selectedDate.date();
  }

  monthlySlots = _sortBy(monthlySlots, slot => slot.date);

  function comparator(monthlySlot) {
    return moment().isSameOrAfter(monthlySlot.date, 'days') ? 'past' : 'future';
  }

  const items = _groupBy(monthlySlots, comparator);

  if (items['past'])
    return getDayOfMonth(items['past'].pop().date);

  if (items['future'])
    return getDayOfMonth(items['future'].shift().date);
  return null;
}

export default findSelectedDate;