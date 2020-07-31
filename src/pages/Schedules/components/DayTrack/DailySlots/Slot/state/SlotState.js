import { observable, computed, action, reaction } from "mobx";

import { calculateTimeByOffset } from 'pages/Schedules/utils/Schedule';

class SlotState {

  constructor(dailySlotsState, index, dayTrackState) {
    this.initStates(dailySlotsState, dayTrackState);
    this.initIndex(index);
  }

  //initialization
  @observable dailySlotsState;
  @observable dayTrackState;

  @action
  initStates = (dailySlotsState, dayTrackState) => {
    this.dailySlotsState = dailySlotsState;
    this.dayTrackState = dayTrackState;
  }

  //index
  @observable index;

  @action
  initIndex = (index) => {
    this.index = index;
  }

  //props

  @computed get slot() {
    return this.dailySlotsState.slots[this.index];
  }

  @computed get offset() {
    return this.slot.start_pos;
  }

  @computed get title() {
    return `${calculateTimeByOffset(this.slot.start_pos)} - ${calculateTimeByOffset(this.slot.end_pos)}`;
  }

  @computed get width() {
    return this.slot.end_pos - this.slot.start_pos;
  }

  //appointments

  @computed get appointments() {
    return this.slot.appointments;
  }

  @computed get busyAppointments() {
    return this.appointments.filter(appointment => appointment.is_busy);
  }

  @action
  dispose = () => {
    this.durationOpened = false;
    this.dailySlotsState = null;
    this.index = null;
    this.disposeReaction();
  }

  //duration

  @computed get duration() {
    return  this.slot.duration;
  }

  @computed get isBusy() {
    return !!this.slot.isBusy;
  }
  
  setDuration = (duration) => {
    this.dailySlotsState.setSlotDuration(Number(duration), this.index);
    this.handleClose();
  }


  // dropdown
  
  @observable openedType;

  @action
  handleToggleByType = (type) => {
    this.openedType === type ? this.handleClose() : this.openedType = type;
  }

  @action
  handleToggle = (type) => {
    this.openedType ? this.handleClose() : this.openedType = type;
  }

  @action
  handleClose = () => {
    this.openedType = undefined;
  }

  @action
  initReaction = () => {
    this.handleChangeOpened = reaction(
      () => this.openedType,
      type => this.dayTrackState.setOpened(!!type)
    );
  }

  @action
  disposeReaction = () => {
    this.handleChangeOpened();
  }

}

export default SlotState;