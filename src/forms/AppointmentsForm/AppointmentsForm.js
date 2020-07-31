import { reaction, computed } from 'mobx';
import BaseForm from 'forms/BaseForm';
import fields from './fields';

import { getMonthFirstDay, getMonthLastDay } from 'utils/moment';

class AppointmentsForm extends BaseForm {
  constructor(...props) {
    super(...props);

    this.addDateHandler();
  }

  @computed get fetchParams() {
    const { from, to } = this.values();

    return { from, to };
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

export default AppointmentsForm;
