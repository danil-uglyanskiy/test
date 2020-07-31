import { types } from 'mobx-state-tree';

import Doctor from './Doctor';
import Specialization from './Specialization';
import Patient from './Patient';
import ConsultationType from './ConsultationType';
import Anamnesis from './Anamnesis';
import Conversation from './Conversation';

export default types
  .model('Appointment', {
    id: types.string,
    consultation_type: types.maybeNull(ConsultationType),
    doctors: types.array(Doctor),
    start_date: types.string,
    end_date: types.string,
    patient: types.maybeNull(Patient),
    schedule_id: types.string,
    anamnesis: types.maybeNull(Anamnesis),
    specialization: types.maybeNull(Specialization),
    state: types.string,
    conversation: types.maybeNull(Conversation),
    type: types.string
  });