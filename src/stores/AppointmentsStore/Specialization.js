import { types } from 'mobx-state-tree';

export default types
  .model('Specialization', {
    id: types.string,
    name: types.string,
    type: types.string
  });