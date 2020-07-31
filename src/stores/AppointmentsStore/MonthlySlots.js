import { types } from 'mobx-state-tree';

const MonthlySlot = types
  .model('MonthlySlot', {
    date: types.string,
    total: types.number
  });

export default types
  .model('MonthlySlots', {
    data: types.optional(types.array(MonthlySlot), [])
  });