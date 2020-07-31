import { types } from 'mobx-state-tree';
import Policies from './Policies';

export default types
  .model('Insurer', {
    id: types.string,
    dog_number: types.maybeNull(types.string),
    insurer_name: types.maybeNull(types.string),
    policies: types.optional(types.array(Policies), []) 
  });
