import { types } from 'mobx-state-tree';
export default types
  .model('ConsultationType', {
    id: types.identifier,
    description: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    type: types.string
  });