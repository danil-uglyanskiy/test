import { types } from 'mobx-state-tree';

export default types
  .model('Slot', {
    start_date: types.string,
    end_date: types.string,
    count: types.number,
    duration: types.number
  });
