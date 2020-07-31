import BaseForm from 'forms/BaseForm';
import fields from './fields';

class DoctorForm extends BaseForm {
  setup() {
    return fields;
  }
}

export default DoctorForm;
