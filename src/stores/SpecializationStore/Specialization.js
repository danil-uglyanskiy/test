import { types } from 'mobx-state-tree';

const Specialization = types.model('Specialization', {
  id: types.identifier,
  name: types.string,
  type: types.string
});

export default Specialization;