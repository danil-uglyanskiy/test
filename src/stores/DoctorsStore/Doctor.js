import { types } from 'mobx-state-tree';
import Avatar from './Avatar';
import Experience from './Experience';
import Organization from './Organization';
import Specialization from './Specialization';
import Education from './Education';

export default types
  .model('Doctor', {
    id: types.identifier,
    avatar: types.maybeNull(Avatar),
    experience: types.maybeNull(Experience),
    first_name: types.maybeNull(types.string),
    middle_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    birth_date: types.maybeNull(types.string),
    blocked_at: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    organization: types.maybeNull(Organization),
    edeucations: types.optional(types.array(Education), []),
    specializations: types.optional(types.array(Specialization), [])
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
