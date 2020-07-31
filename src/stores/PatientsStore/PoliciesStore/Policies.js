import { types } from 'mobx-state-tree';
import Services from '../Services';
import Insurer from './Insurer';

export default types
  .model('Policies', {
    id: types.identifier,
    active: types.boolean,
    begin_date: types.string,
    end_date: types.string,
    ins_amount: types.string,
    ins_dog_id: types.maybeNull(types.string),
    ins_dog_number: types.maybeNull(types.string),
    insurer: types.maybeNull(Insurer),
    policy_id: types.string,
    number: types.string,
    telemed_available: types.boolean,
    services: types.optional(types.array(Services), [])
  });
