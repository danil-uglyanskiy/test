// import { t } from 'utils/localization';
import moment from 'moment';

const fields = [
  'date',
  'from',
  'to'
];

const placeholders = {};

const values = {
  date: moment()
};

const output = {
  date: (value) => value ? moment(value).toDate() : value
};

export default {
  fields,
  placeholders,
  values,
  output
};