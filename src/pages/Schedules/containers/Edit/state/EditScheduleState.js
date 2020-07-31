import { computed, observable, reaction, action } from "mobx";

import { EditScheduleStore, DoctorStore } from 'stores/SchedulesStore';

class EditScheduleState {

  constructor(id, SchedulesForm) {
    this.setDoctorId(id);
    this.initStore();
    this.initForm(SchedulesForm);
  }

  //init
  @observable doctorStore;
  @observable schedulesForm;
  @observable editScheduleStore;
  @observable doctor_id;

  @action
  initStore = () => {
    this.editScheduleStore = EditScheduleStore.create();
    this.doctorStore = DoctorStore.create();
  }

  @action
  initForm = (SchedulesForm) => {
    this.schedulesForm = SchedulesForm;
  }

  @action
  setDoctorId = (id) => {
    this.doctor_id = id;
  }

  initComponent = () => {
    this.fetchDoctor();
    this.fetchSchedule();
  }

  dispose = () => {
    this.fetchScheduleReaction();
  }

  //doctor 
  @observable doctor;

  @computed get isFetchedDoctor() {
    return !!this.doctor;
  }

  @action
  setDoctor = (doctor) => {
    this.doctor = doctor.data.toJSON();
  }

  async fetchDoctor() {
    const doctor = await this.doctorStore.fetch(this.doctor_id);
    this.setDoctor(doctor);
  }

  //slots
  @observable slots = [];

  @action
  setSlots = (slots) => {
    this.slots = slots.data.toJSON();
  }

  @action
  clearSlots = () => {
    this.slots = [];
  }

  @action
  updateSlots = (slots, day) => {
    const index = this.daysForUpdate.findIndex(slot => slot.day === day);
    if (index === -1) {
      this.addDayForUpdate({ day, slots});
    } else {
      this.daysForUpdate[index].slots = slots;
    }
  }

  getSlots = (date) => {
    return this.slots[date];
  }

  //daysForUpdate
  @observable daysForUpdate = [];

  @action
  addDayForUpdate = ({ day, slots}) => {
    this.daysForUpdate = [
      ...this.daysForUpdate,
      {
        day,
        slots
      }
    ];
  }

  @action
  clearDaysForUpdate = () => {
    this.daysForUpdate = [];
  }

  //reactions
  @observable fetchScheduleReaction;

  @action
  fetchSchedule = () => {
    this.fetchScheduleReaction = reaction(
      () => this.schedulesForm.fetchParams,
      data => this.fetch({ ...data, doctor_id: this.doctor_id }),
      { fireImmediately: true }
    );
  }

  async fetch(props) {
    this.setState('pending');
    const data = await this.editScheduleStore.fetch(props);
    this.clearSlots();
    this.setSlots(data);
    this.setState('done');
  }

  async update() {
    if (this.daysForUpdate.toJSON().length > 0) {
      const params = {
        days: this.daysForUpdate,
        doctor: {
          id: this.doctor_id
        }
      };
      this.setState('pending');
      await this.editScheduleStore.update(params);
      this.fetch({ ...this.schedulesForm.fetchParams, doctor_id: this.doctor_id });
      this.clearDaysForUpdate();
    }
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

export default EditScheduleState;