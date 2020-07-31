import { types } from 'mobx-state-tree';

export default types
  .model('Medication', {
    id: types.string,
    created_at: types.string,
    klp_code: types.string,
    trade_name: types.string
  });
