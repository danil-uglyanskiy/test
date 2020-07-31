import { types } from 'mobx-state-tree';

const Specialization = types.model('Specialization', {
  id: types.string,
  name: types.string,
});

export { Specialization };
