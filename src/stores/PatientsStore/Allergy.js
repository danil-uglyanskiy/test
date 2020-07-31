import { types } from 'mobx-state-tree';

export default types
  .model('Allergy', {
    id: types.string,
    code: types.string,
    name: types.string,
    type: types.string
  });
