import moment from 'moment';

import { getDuration } from 'utils/moment';
import { sizes } from 'pages/Schedules/utils/Schedule';

function calculateSlotOffset(date, day) {
  const dayStart = moment(day).startOf();
  let offset = getDuration(dayStart, moment(date)).as('minutes');
  offset = offset * sizes.minuteWidth;

  return offset > sizes.containerWidth ? sizes.containerWidth : offset;
}

function slotMapper({ slot, day }) {
  const { start_date, end_date, is_busy: isBusy, duration, appointments } = slot;

  const start_pos = calculateSlotOffset(start_date, day);
  const end_pos = calculateSlotOffset(end_date, day);

  return { start_pos, end_pos, duration, appointments, isBusy };
}

function slotsMapper({ slots = [], day }) {
  return slots.map(slot => slotMapper({ slot, day }));
}

export default slotsMapper;