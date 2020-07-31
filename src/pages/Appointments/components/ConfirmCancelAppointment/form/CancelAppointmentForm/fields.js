import { t } from 'utils/localization';

const fields = [
  'cancelled_why'
];

const placeholders = {
  'cancelled_why': t('Appointments.Cancel.Placeholder')
};

const rules = { 
  'cancelled_why': 'required'
};

export default {
  fields,
  placeholders,
  rules
};