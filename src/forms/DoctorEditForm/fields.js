const fields = [
  'email',
  'phone',
  'first_name',
  'last_name',
  'middle_name',
  'specialization_ids',
];

const labels = {
  email: 'Form.Email',
  phone: 'Form.Phone',
  first_name: 'Form.FirstName',
  last_name: 'Form.LastName',
  middle_name: 'Form.MiddleName',
  specialization_ids: 'DoctorForm.SpecializationLabel',
};

const placeholders = {};

const types = {};

const rules = {
  email: 'email|required',
};

const values = {
  specialization_ids: [],
};

export default {
  fields,
  labels,
  placeholders,
  rules,
  types,
  values,
};
