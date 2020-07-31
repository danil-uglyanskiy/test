import { types } from 'mobx-state-tree';

export default types
  .model('Disease', {
    id: types.string,
    code: types.string,
    name: types.string
  });
