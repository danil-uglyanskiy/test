import { types } from 'mobx-state-tree';

export default types
  .model('AppointmentSchedule', {
    id: types.string,
    state: types.string,
    start_date: types.string,
    end_date: types.string,
    day: types.string,
    duration: types.number,
    is_busy: types.number
  });