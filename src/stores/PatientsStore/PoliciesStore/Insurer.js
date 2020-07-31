import {types} from 'mobx-state-tree';

export default types
  .model('Insurer', {
    id: types.identifier,
    insurer_name: types.string
  });