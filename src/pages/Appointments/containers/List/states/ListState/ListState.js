import { action, toJS , observable, computed, reaction } from 'mobx';

import moment, { datesEqual } from 'utils/moment';

import { appointmentsMapper, findSelectedDate } from './utils';
import { AppointmentsStore } from 'stores/AppointmentsStore';
import fields from 'forms/AppointmentsForm/fields';
import AppointmentsForm from 'forms/AppointmentsForm/AppointmentsForm';


class ListState {

  @observable.ref appointmentsStore;
  @observable appointmentsForm;

  constructor() {
    this.initStore();
    this.initForm();
  }

  @computed get form() {
    return this.appointmentsForm;
  }

  //monthlySlots
  @observable.ref monthlySlots = [];

  findSameDay = (slot, day) => {
    const date = moment(this.consultationDate);
    
    return moment(slot.date).isSame(date.date(day), 'day');
  }

  getSlotsByDay = (day) => {
    return this.monthlySlots.find(slot => this.findSameDay(slot, day))?.total;
  }

  @action
  setMonthlySlots = (monthlySlots) => {
    this.monthlySlots = monthlySlots;
  }

  @action
  clearMonthlySlots = () => {
    this.monthlySlots = [];
  }

  //dailySlots
  @observable.ref dailySlots = new Map();

  @action
  setDailySlots = (dailySlots) => {
    this.dailySlots = appointmentsMapper(dailySlots);
  }

  @action
  clearDailySlots = () => {
    this.dailySlots = [];
  }

  //date
  @observable.ref selectedDate;
  @observable.ref date;

  @computed get consultationDate() {
    return this.form.$('date').value;
  }

  @action
  setDate(date) {
    this.date = date;
  }

  @action
  toggleSelectedDate(day) {
    datesEqual(this.selectedDate, this.consultationDate.date(day)) ?
      this.clearSelectedDate() :
      this.setSelectedDate(day);
  }

  @action
  setSelectedDate(day) {
    if (day) {
      this.selectedDate = moment(this.consultationDate).date(day);
      this.fetchDailySlots();
    }
  }

  @action
  clearSelectedDate() {
    this.selectedDate = null;
  }

  //initializations
  @action
  initStore() {
    this.appointmentsStore = AppointmentsStore.create();
  }

  @action
  initForm() {
    this.appointmentsForm = new AppointmentsForm(fields);
  }

  init() {
    this.addHandlers();
  }

  async fetch() {
    const params = this.appointmentsForm.values();
    const store = await this.appointmentsStore.fetchMonthlySlots(params);
    const data = toJS(store.monthlySlots.data);
    this.onFetch(data);
    return store;
  }

  async fetchDailySlots() {
    const { selectedDate } = this;
    const date = moment(selectedDate);
    const params = {
      from: date.format(),
      to: date.format()
    };

    const store = await this.appointmentsStore.fetch(params);
    const data = toJS(store.data);
    this.onFetchDailySlots(data);
    return store;
  }

  dispose() {
    this.clearSelectedDate();
    this.removeHandlers();
    this.clearSelectedDate();
    this.clearSelectedAppointment();
  }

  @action
  onFetch(data) {
    this.setMonthlySlots(data);
    this.setDate(this.consultationDate);
    this.setSelectedDate(findSelectedDate(this.monthlySlots, this.selectedDate));
  }

  @action
  onFetchDailySlots(data) {
    this.setDailySlots(data);
  }

  @computed get isPending() {
    return this.appointmentsStore.isPending;
  }

  @computed get isFetched() {
    return !this.appointmentsStore.data || this.appointmentsStore.isFetched;
  }

  //appointments
  @observable selectedAppointment;

  @action
  setSelectedAppointment(appointment) {
    this.selectedAppointment = appointment;
  }

  @action
  clearSelectedAppointment() {
    this.selectedAppointment = null;
  }

  async deleteAppointment(why) {
    const params = {
      cancelled_why: why
    };
    const id = this.selectedAppointment.id;
    try {
      await this.appointmentsStore.delete(id, params);
    }
    finally {
      this.clearSelectedAppointment();
      this.clearSelectedDate();

      await this.fetch();
    }
  }

  //handlers
  @observable fetchAppointmentsReaction;

  addHandlers = () => {
    this.fetchAppointmentsReaction = reaction(
      () => this.form.$('date').value,
      () => this.handleChangeDate(),
      { fireImmediately: true }
    );
  }

   handleChangeDate() {
    this.clearSelectedDate();
    this.fetch();
  }

  removeHandlers() {
    this.fetchAppointmentsReaction = null;
  }

}

export default ListState;