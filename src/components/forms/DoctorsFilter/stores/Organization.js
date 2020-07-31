import { types } from 'mobx-state-tree';

export default types
  .model('Organization', {
    id: types.string,
    title: types.string,
  });