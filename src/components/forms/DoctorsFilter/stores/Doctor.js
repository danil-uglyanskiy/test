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
    experience: Experience,
    first_name: types.string,
    middle_name: types.string,
    last_name: types.string,
    // birth_date: types.string,
    // email: types.string,
    // phone: types.string,
    organization: types.maybeNull(Organization),
    educations: types.array(Education),
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
