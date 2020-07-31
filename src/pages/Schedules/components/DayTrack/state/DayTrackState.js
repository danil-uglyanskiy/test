import { observable, action, computed } from "mobx";

import { getDayName, getDayOfMonth } from 'utils/moment';
import sortSlotsByRow from './utils/sortSlotsByRow';

class DayTrackState {
  constructor({ slots, day }) {
    this.setDay(day);
    this.setSlots(slots);
  }

  //slots
  @observable slots = [];

  @action
  setSlots = (slots) => {
    const { day } = this;
    this.slots = sortSlotsByRow({ slots, day });
  }

  @action
  clearSlots = () => {
    this.slots = [];
  }

  //day
  @observable day;

  @action
  setDay = (day) => {
    this.day = day;
  }

  //opened
  @observable opened = false;

  @action
  setOpened = (opened) => {
    this.opened = opened;
  }

  //date

  @computed get dayOfMonth() {
    return getDayOfMonth(this.day);
  }

  @computed get dayName() {
    return getDayName(this.day);
  }
}

export default DayTrackState;