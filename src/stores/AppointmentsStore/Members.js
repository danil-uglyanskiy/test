import { types } from 'mobx-state-tree';

import Avatar from './Avatar';

export default types
  .model('Members', {
    id: types.identifier,
    first_name: types.string,
    avatar: types.maybeNull(Avatar),
    middle_name: types.string,
    last_name: types.string,
  });