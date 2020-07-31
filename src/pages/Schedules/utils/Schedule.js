import moment, { getDuration } from 'utils/moment';

const containerWidth = 1296;
const minutesCount = 24 * 60;
const minuteWidth = containerWidth / minutesCount;
const timeSlotWidth = minuteWidth * 5;
const slotDuration = Number(process.env.REACT_APP_DEFAUL_SLOT_DURATION);
const slotDurationWidth = slotDuration * minuteWidth;


export const sizes = {
  containerWidth,
  minutesCount,
  minuteWidth,
  timeSlotWidth,
  slotDurationWidth,
  slotDuration
};

export function getTimeSlotByOffset(offset) {
  return Math.round(offset / sizes.timeSlotWidth);
}

export function roundOffsetToSlot(offset) {
  return getTimeSlotByOffset(offset) * sizes.timeSlotWidth;
}

export function roundOffsetByDuration(offset, duration) {
  return offset * sizes.minuteWidth * duration;
}

export function calculateTimeByOffset(offset) {
  const minutes = Math.round(offset / sizes.minuteWidth);

  return moment()
    .hour(0)
    .minute(minutes)
    .format("HH:mm");
}

export function calculateSlotOffset(slot, day) {
  const dayStart = moment(day).startOf('day');

  return getDuration(dayStart, slot.start_date).as('minutes') * sizes.minuteWidth;
}

export function calculateSlotWidth(slot) {
  return parseInt(getDuration(slot.start_date, slot.end_date).as('minutes')) * sizes.minuteWidth;
}

export function calculateDateByTime(minutes, day) {
  return moment(day)
    .hour(0)
    .minute(minutes).toISOString();
}