import { observable, action, reaction, computed } from 'mobx';

import { slotsMapper } from './utils';
import { SchedulesForm } from 'forms';
import { SchedulesStore } from 'stores/SchedulesStore';

class SchedulesState {
  constructor() {
    this.initForm();
    this.initStore();
  }

  //initialization
  @observable schedulesStore;
  @observable schedulesForm;

  @action
  initStore = () => {
    this.schedulesStore = SchedulesStore.create();
  }

  @action
  initForm = () => {
    this.schedulesForm = new SchedulesForm();
  }

  @action
  dispose = () => {
    this.fetchScheduleReaction();
  }

  //reactions
  @observable fetchScheduleReaction;

  initReaction = () => {
    this.fetchScheduleReaction = reaction(
      () => this.schedulesForm.fetchParams,
      data => this.fetch(data),
      { fireImmediately: true }
    );
  }

  //slots
  @observable slots = [];

  @action
  setSlots = (slots) => {
    this.slots = slotsMapper(slots);
  }

  @action
  clearSlots = () => {
    this.slots = [];
  }

  @computed get hasSlots() {
    return this.slots.length > 0;
  }
  
  async fetch(data) {
    this.setState('pending');
    const slots = await this.schedulesStore.fetch(data);
    this.clearSlots();
    this.setSlots(slots.data.toJSON());
    this.setState('done');
  }
  

  //state
  @observable state;

  @action
  setState = (state) => {
    this.state = state;
  }

  @computed get isFetched() {
    return this.state === 'done';
  }
}

export default SchedulesState;