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
    birth_date: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    organization: types.maybeNull(Organization),
    educations: types.array(Education),
    specializations: types.array(Specialization),
  });