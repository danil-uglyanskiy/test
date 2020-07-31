import { types } from 'mobx-state-tree';

import Slot from './Slot';

export default types
  .model('ScheduleItem', {
    day: types.string,
    slots: types.array(Slot)
  });