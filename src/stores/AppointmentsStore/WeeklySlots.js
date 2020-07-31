import { types } from 'mobx-state-tree';

const WeeklySlot = types
  .model('WeeklySlots', {
    start_time: types.string,
    end_time: types.string,
    date: types.string,
    total: types.number
  });

export default types
  .model('WeeklySlots', {
    data: types.optional(types.array(WeeklySlot), [])
  });