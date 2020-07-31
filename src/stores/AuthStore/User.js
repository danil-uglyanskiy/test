import { types } from 'mobx-state-tree';

import { Specialization } from './Specialization';
import { Avatar } from './Avatar';

export const User = types
  .model('User', {
    id: types.identifier,
    avatar: types.maybeNull(Avatar),
    email: types.maybe(types.string),
    phone: types.maybe(types.string),
    first_name: types.maybe(types.string),
    last_name: types.maybe(types.string),
    middle_name: types.maybe(types.string),
    specializations: types.array(Specialization),
  })
  .views(self => ({
    get fullName() {
      const { first_name, last_name } = self;
      return [last_name, first_name].join(' ');
    },
  }));
