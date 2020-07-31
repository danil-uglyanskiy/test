import { types } from 'mobx-state-tree';
import Avatar from './Avatar';
import Experience from './Experience';
import Organization from './Organization';
import Specialization from './Specialization';

export default types
  .model('DoctorItem', {
    id: types.string,
    avatar: types.maybeNull(Avatar),
    experience: Experience,
    first_name: types.string,
    middle_name: types.string,
    last_name: types.string,
    organization: types.maybeNull(Organization),
    specializations: types.array(Specialization),
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
