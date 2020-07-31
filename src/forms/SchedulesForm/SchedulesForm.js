import { reaction, computed } from 'mobx';
import BaseForm from 'forms/BaseForm';
import fields from './fields';

import { getMonthFirstDay, getMonthLastDay } from 'utils/moment';

class SchedulesForm extends BaseForm {
  constructor(...props) {
    super(...props);

    this.addDateHandler();
  }

  @computed get fetchParams() {
    const { from, to, doctor, specializations, organization } = this.values();
    const include = {
      specialization_ids: specializations.map(s => s.id)
    };

    const exclude = {
      doctor_ids: doctor.id !== '' ? [doctor.id] : []
    };

    const params = {
      from,
      to,
      include,
      exclude
    };

    const { id } = organization;

    if (id) params.organization = { id };

    return params;
  }

  setStartEndDates = (date) => {
    let from = getMonthFirstDay(date);
    let to = getMonthLastDay(date);

    this.update({ from, to });
  }

  addDateHandler() {
    this._addDateHandler = reaction(
      () => this.$('date').value,
      (date) => this.setStartEndDates(date),
      { fireImmediately: true }
    );
  }

  setup() {
    return fields;
  }
}

export default SchedulesForm;