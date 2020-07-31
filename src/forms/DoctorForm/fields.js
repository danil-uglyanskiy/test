import { t } from 'utils/localization';
import { phoneMask } from 'utils/inputMasks';

const fields = [
  'avatar',
  'avatar.id',
  'avatar.image_urls',
  'avatar.image_urls.thumb',
  'avatar.image_urls.original',
  'email',
  'phone',
  'first_name',
  'last_name',
  'middle_name',
  'birth_date',
  'specializations[]',
  'specializations[].id',
  'specializations[].name',
  'specializations[].type',
  'educations[]',
  'educations[].title',
  'educations[].from_date',
  'educations[].to_date',
  'blocked_at',
  'organization',
  'organization.id',
  'organization.title'
];

const labels = {
  email: t('Form.Email'),
  phone: t('Form.Phone'),
  first_name: t('Form.FirstName'),
  last_name: t('Form.LastName'),
  birth_date: t('Form.BirthDateLabel'),
  middle_name: t('Form.MiddleName'),
  'specializations[]': t('DoctorForm.SpecializationLabel'),
  organization: t('DoctorForm.OrganizationLabel'),
  'educations[].title': t('DoctorForm.EducationTitleLabel')
};

const placeholders = {
  first_name: t('Form.FirstNamePlaceholder'),
  last_name: t('Form.LastNamePlaceholder'),
  middle_name: t('Form.MiddleNamePlaceholder'),
  birth_date: t('Form.BirthDatePlaceholder'),
  email: t('Form.EmailPlaceholder'),
  'specializations[]': t('DoctorForm.SpecializationPlaceholder'),
  organization: t('DoctorForm.OrganizationPlaceholder'),
  'educations[].title': t('DoctorForm.EducationTitlePlaceholder'),
  'educations[].from_date': t('DoctorForm.EducationFromDatePlaceholder'),
  'educations[].to_date': t('DoctorForm.EducationToDatePlaceholder'),
  from_date: t('Form.FromDate'),
  to_date: t('Form.ToDate')
};

const types = {
  avatar: 'file'
};

const rules = {
  first_name: 'required|string|min:2|max:32',
  last_name: 'required|string|min:2|max:32',
  middle_name: 'required|string|min:2|max:32',
  birth_date: `required`,
  email: 'required|email|min:5',
  phone: 'required|string|min:10|max:20',
  educations: 'required|array|min:1',
  'educations[].title': 'required|string|min:3',
  'educations[].from_date': 'required|string',
  'educations[].to_date': 'required|string',
  'organization.title': 'required'
};

const values = {
  specializations: [{
    id: null,
    name: null,
    type: null
  }],
  educations: [{
    title: '',
    from_date: '',
    to_date: ''
  }]
};

const defaults = {
  specializations: [{
    id: null,
    name: null,
    type: null
  }],
  educations: [{
    title: '',
    from_date: '',
    to_date: ''
  }],
  blocked_at: null
};

const extra = {
  avatar: {
    size: 57
  },
  phone: {
    mask: phoneMask
  },
  birth_date: {
    calendarSize: 'small'
  },
  from_date: {
    calendarSize: 'small'
  },
  to_date: {
    calendarSize: 'small'
  }
};

export default {
  fields,
  labels,
  placeholders,
  rules,
  types,
  values,
  extra,
  defaults
};
