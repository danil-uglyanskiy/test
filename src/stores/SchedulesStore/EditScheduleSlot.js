import { types } from 'mobx-state-tree';

import Appointment from './Appointment';

export default types
  .model('EditScheduleSlot', {
    start_date: types.string,
    end_date: types.string,
    duration: types.number,
    is_busy: types.number,
    appointments: types.array(Appointment)
  });
