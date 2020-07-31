import { types } from 'mobx-state-tree';

export default types
  .model('Vaccine', {
    id: types.string,
    code: types.string,
    name: types.string,
    exec_date: types.maybeNull(types.string)
  });
