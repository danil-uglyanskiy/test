import { types } from 'mobx-state-tree';

export default types
  .model('MedicalServices', {
    id: types.string,
    name: types.string,
    code: types.string
  });