import { types } from 'mobx-state-tree';
import Symptome from './Symptome';
import Specialization from './Specialization';
import MedicalServices from './MedicalServices';

export default types
  .model('Anamnesis', {
    lifestyle_advice: types.maybeNull(types.string),
    medical_advice: types.maybeNull(types.string),
    medical_opinion: types.maybeNull(types.string),
    medical_services: types.optional(types.array(MedicalServices), []),
    symptoms: types.optional(types.array(Symptome), []),
    specializations: types.optional(types.array(Specialization), []),
    general_inspection: types.maybeNull(types.string),
    arterial_pressure: types.maybeNull(types.string),
    body_temperature: types.maybeNull(types.string),
    case_history: types.maybeNull(types.string)
  });