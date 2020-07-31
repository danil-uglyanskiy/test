import { types } from 'mobx-state-tree';
import Avatar from './Avatar';
import Insurer from './Insurer';

export default types
  .model('Patient', {
    id: types.identifier,
    avatar: types.maybeNull(Avatar),
    first_name: types.maybeNull(types.string),
    middle_name: types.maybeNull(types.string),
    gender: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    birth_date: types.maybeNull(types.string),
    insurers: types.optional(types.array(Insurer), [])
  })
  .views(self => ({
    get fullName() {
      return [
        self.last_name,
        self.first_name,
        self.middle_name,
      ].filter(item => item).join(' ');
    },
  }));
