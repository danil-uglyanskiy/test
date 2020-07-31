import { t } from 'utils/localization';
import moment from 'moment';

const fields = [
  'date',
  'from',
  'to',
  'doctor',
  'doctor.id',
  'doctor.avatar',
  'doctor.educations',
  'doctor.specializations',
  'doctor.experience',
  'doctor.first_name',
  'doctor.last_name',
  'doctor.middle_name',
  'specializations[]',
  'specializations[].id',
  'specializations[].name',
  'organization',
  'organization.id',
  'organization.title'
];

const placeholders = {
  doctor: t('SchedulesForm.DoctorsEditFilter.Placeholder'),
  specializations: t('SchedulesForm.SpecializationsFilter.Placeholder'),
  organization: t('SchedulesForm.OrganizationFilter.Placeholder')
};

const values = {
  'date': moment()
};

const types = {};

const rules = {};

const extra = {};

const output = {
  date: (value) => value ? moment(value).toDate() : value
};

const defaults = {
  doctors: [],
  specializations: [{
    id: '',
    name: ''
  }]
};

export default {
  fields,
  placeholders,
  types,
  rules,
  values,
  extra,
  output,
  defaults
};