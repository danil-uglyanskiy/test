import BaseForm from 'forms/BaseForm';

import { fields } from './index';

class PolicyForm extends BaseForm {
  setup() {
    return fields;
  }
}

export default PolicyForm;
