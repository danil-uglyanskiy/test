import { types } from 'mobx-state-tree';
import Services from './Services';

export default types
  .model('Policies', {
    id: types.string,
    begin_date: types.maybeNull(types.string),
    end_date: types.maybeNull(types.string),
    number: types.maybeNull(types.string),
    services: types.optional(types.array(Services), []) 
  });
