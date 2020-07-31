import { types } from 'mobx-state-tree';

export default types
  .model('Services', {
    id: types.string,
    begin_date: types.maybeNull(types.string),
    end_date: types.maybeNull(types.string),
    lpu_id: types.maybeNull(types.string),
    lpu_name: types.maybeNull(types.string),
    program_id: types.maybeNull(types.string),
    treatment_id: types.maybeNull(types.string),
    treatment_name: types.maybeNull(types.string),
  });
