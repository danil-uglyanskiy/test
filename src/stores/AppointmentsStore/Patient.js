import { types } from 'mobx-state-tree';

export default types
  .model('Patient', {
    id: types.string,
    birth_date: types.string,
    first_name: types.string,
    middle_name: types.string,
    last_name: types.string,
    gender: types.string
  });