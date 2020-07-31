import { types } from 'mobx-state-tree';
import Policies from './Policies';

export default types
  .model('PatientsPolicies', {
    id: types.identifier,
    policies: types.optional(types.array(Policies), []),
    childrens_policies: types.optional(types.array(Policies), []),
  });
