import { types } from 'mobx-state-tree';

const WorkDay = types.model('WorkDay', {
  from_time: types.number,
  to_time: types.number,
  week_day: types.number,
});

const Schedule = types.model('Schedule', {
  id: types.string,
  work_days: types.array(WorkDay),
});

export { Schedule };
