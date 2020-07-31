import { sizes, calculateDateByTime } from 'pages/Schedules/utils/Schedule';

function slotsByDuration(slot, day) {
  const start_time = slot.start_pos / sizes.minuteWidth;
  const end_time = slot.end_pos / sizes.minuteWidth;

  const slots = [];
  for (let time = start_time; time < end_time; time += slot.duration)
    slots.push({
      start_date: calculateDateByTime(time, day),
      end_date: calculateDateByTime(time + slot.duration, day)
    });
  return slots;
}

const positionToTimeMapper = (slots, day) => {
  const slotsArray = [];
  slots.forEach(slot => {
    slotsArray.push(...slotsByDuration(slot, day));
  });
  return slotsArray;
};

export default positionToTimeMapper;