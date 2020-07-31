
import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

import { durationChecker } from './rules';

validatorjs.useLang('ru');

validatorjs.register(
  'duration',
  durationChecker,
  'The :attribute is not a multiple of 5 minutes.',
);
class BaseState extends Form {
  options() {
    return {
      showErrorsOnClear: false,
      showErrorsOnChange: true,
      showErrorsOnSubmit: true,
      validateOnChange: true
    };
  }
  plugins() {
    return {
      dvr: dvr(validatorjs)
    };
  }
}
export default BaseState;