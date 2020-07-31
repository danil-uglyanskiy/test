import _cloneDeep from 'lodash/cloneDeep';
import _sortBy from 'lodash/sortBy';
import _last from 'lodash/last';

import moment from 'utils/moment';

export function flatSlots(slots) {
  const rows = [];

  const flatten = (arr) => {
    const row = [];
    const rest = [];

    arr.forEach((slot) => {
      if (row.length === 0) {
        row.push(slot);
        return;
      }

      const prSlot = _last(row);
      const isValid = moment(prSlot.end_date).isSameOrBefore(slot.start_date);

      isValid ? row.push(slot) : rest.push(slot);
    });
    if (row.length > 0) rows.push(row);
    if (rest.length > 0) flatten(rest);
  };

  flatten(slots);

  return rows;
}

function addEmptySlot({ slots, startDay, endDay }) {
  const slotsAfterMapping = [];

  // Если слот начинается не с начала дня, добавляем начальную дату для пустого слота 
  let startEmptySlot = startDay;
  let endEmptySlot;

  slots.forEach(slot => {
    endEmptySlot = slot.start_date;

    if (!moment(endEmptySlot).isSame(startEmptySlot)) {
      slotsAfterMapping.push({
        count: 0,
        start_date: startEmptySlot,
        end_date: endEmptySlot
      });
    }

    startEmptySlot = slot.end_date;
    slotsAfterMapping.push(slot);
  });

  // Если начало пустого слота не совпадает с концом дня, добавляем пустой слот в конец
  if (moment(startEmptySlot).hour() !== 0) {
    endEmptySlot = endDay;

    slotsAfterMapping.push({
      count: 0,
      start_date: startEmptySlot,
      end_date: endEmptySlot
    });
  }

  return slotsAfterMapping;
}

function addEmptySlots(row, day) {
  const startDay = moment(day).startOf('day').toISOString();
  const endDay = moment(day).startOf('day').add(1, 'day').toISOString();

  //Если слотов на этот день нет
  if (!row.length) {
    const emptyslot = {
      count: 0,
      start_date: startDay,
      end_date: endDay
    };

    return [[emptyslot]];
  }

  return row.map(slots => addEmptySlot({ startDay, endDay, slots }));
}

function verificationSlot(slot) {
  const { start_date, end_date } = slot;

  const startDate = moment(start_date);
  let endDate = moment(end_date);

  endDate = Math.abs(endDate.date() - startDate.date()) > 0
    ? endDate = startDate.add(1, 'days').startOf('day')
    : endDate;

  return { ...slot, end_date: endDate.toISOString() };
}

function verificationSlots(slots) {
  return slots.map(slot => verificationSlot(slot));
}

function sortSlotsByRow({ slots, day }) {
  let data = _cloneDeep(slots);
  data = verificationSlots(data);
  data = _sortBy(data, slot => moment(slot.start_date).toDate());
  data = flatSlots(data);
  data = addEmptySlots(data, day);

  return data;
}

export default sortSlotsByRow;
