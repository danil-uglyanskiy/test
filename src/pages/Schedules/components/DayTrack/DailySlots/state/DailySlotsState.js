import { observable, action, reaction } from "mobx";

import { slotsMapper, positionToTimeMapper } from './utils/index';
import { sizes, roundOffsetToSlot } from 'pages/Schedules/utils/Schedule';

class DailySlotsState {

  constructor(editScheduleState, day) {
    this.initState(editScheduleState);
    this.setDay(day);
    this.setSlots();
  }

  //initialization
  @observable editScheduleState;

  @action
  initState = (editScheduleState) => {
    this.editScheduleState = editScheduleState;
  }

  //day
  @observable day;

  @action
  setDay = (day) => {
    this.day = day;
  }

  //slots
  @observable slots = [];

  @action
  setSlots = () => {
    const { editScheduleState, day } = this;
    const slots = editScheduleState.getSlots(day);

    this.slots = slotsMapper({ slots, day });
  }

  @action
  updateSlots = (slots) => {
    this.slots = slots;
  }

  @action
  setSlotDuration(duration, index) {
    let slots = this.slots;
    const slot = slots[index];
    const width = slot.end_pos - slot.start_pos;
    const durationWidth = duration * sizes.minuteWidth;
    let deltaWidth = (Math.floor(width / (durationWidth)) + 1) * durationWidth - width;

    if (deltaWidth === durationWidth)
      deltaWidth = 0;

    const nextSlot = slots[index + 1];
    const endCurrentPos = slots[index].end_pos + deltaWidth;

    if ((!nextSlot || (nextSlot.start_pos >= endCurrentPos)) && (endCurrentPos <= sizes.containerWidth)) {
      slots[index].duration = duration;
      slots[index].end_pos += deltaWidth;
      this.slots = Array.from(slots);
    }
  }

  sortByOffset = (a, b) => a.start_pos - b.start_pos;

  @action
  addSlot(position) {
    const currentPos = roundOffsetToSlot(position);
    const end_pos = currentPos + sizes.slotDurationWidth;
    let flag = false;
    this.slots.forEach(slot => {
      (end_pos > slot.start_pos && end_pos < slot.end_pos) && (flag = true);
    });

    const slots = [
      ...this.slots,
      {
        end_pos,
        start_pos: currentPos,
        duration: sizes.slotDuration,
        appointments: []
      }
    ].sort(this.sortByOffset);
    const index = slots.findIndex(slot => slot.start_pos === currentPos);

    !flag && (this.slots = slots);
    if (index !== -1) {
      return index;
    }
  }

  @action
  removeSlot(index) {
    const slots = this.slots.toJSON();
    slots.splice(index, 1);
    this.updateSlots(slots);
  }

  @action
  clearSlots() {
    this.slots = undefined;
  }

  //reaction
  @observable handleChangeSlots;

  @action
  initReaction = () => {
    this.handleChangeSlots = reaction(
      () => this.slots,
      slots => this.editScheduleState.updateSlots(positionToTimeMapper(slots, this.day), this.day)
    );
  }

  @action
  disposeReaction = () => {
    this.handleChangeSlots();
  }

  dispose = () => {
    this.disposeReaction();
    this.clearSlots();
  }
}

export default DailySlotsState;