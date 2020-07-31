import { types } from 'mobx-state-tree';
import Avatar from './Avatar';
import Insurer from './Insurer';
import Allergy from './Allergy';
import Medication from './Medication';
import Disease from './Disease';
import Vaccine from './Vaccine';

export default types
  .model('DetailPatient', {
    id: types.identifier,
    avatar: types.maybeNull(Avatar),
    first_name: types.string,
    middle_name: types.string,
    gender: types.maybeNull(types.string),
    last_name: types.string,
    birth_date: types.string,
    insurers: types.optional(types.array(Insurer), []),
    allergies: types.optional(types.array(Allergy), []),
    medications: types.optional(types.array(Medication), []),
    diseases: types.optional(types.array(Disease), []),
    vaccines: types.optional(types.array(Vaccine), [])

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
