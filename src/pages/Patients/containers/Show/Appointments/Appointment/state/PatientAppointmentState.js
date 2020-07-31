import { observable, action, computed } from "mobx";

import { AppointmentStore } from 'stores/AppointmentsStore';
import { t } from 'utils/localization';
import moment from 'utils/moment';

class PatientAppointmentState {

  constructor(id) {
    this.setId(id);
    this.initStore();
  }

  //initialization

  @observable appointmentStore;

  @action
  initStore = () => {
    this.appointmentStore = AppointmentStore.create();
  }

  //id
  @observable id;

  @action
  setId = (id) => {
    this.id = id;
  }

  //appointment
  @observable appointment;

  @action
  setAppointment = (appointment) => {
    this.appointment = appointment;
  }

  @action
  clearAppointment = () => {
    this.appointment = undefined;
  }

  async fetch() {
    this.setState('pending');

    const appointment = await this.appointmentStore.fetch(this.id);
    this.setAppointment(appointment.data.toJSON());
    this.setState('done');
  }

  //state
  @observable state = 'done';

  @computed get isFetched() {
    return this.state === 'done';
  }

  @action
  setState = (state) => {
    this.state = state;
  }

   //props
    
   @computed get anamnesis() {
    return this.appointment.anamnesis;
  }

  @computed get symptoms() {
    return this.anamnesis ?.symptoms.map(symptome => symptome.name).join(', ');
  }

  @computed get consultationType() {
    return this.appointment.consultation_type.name;
  }

  @computed get specialization() {
    return this.appointment.specialization.name;
  }

  @computed get doctors() {
    return this.appointment.doctors;
  }

  @computed get date() {
    return moment(this.appointment.start_date).format('DD MMMM YYYY в hh:mm');
  }

  @computed get generalInspection() {
    return this.anamnesis ?.general_inspection;
  }

  @computed get medicalOpinion() {
    return this.anamnesis ?.medical_opinion;
  }

  @computed get medicalAdvice() {
    return this.anamnesis ?.medical_advice;
  }

  @computed get complaints() {

    return {
      heading: t('Appointments.Complaints'),
      list: [
        {
          name: t('Appointments.Symptoms'),
          description: this.symptoms
        },
        {
          name: t('Appointments.GeneralInspection'),
          description: this.generalInspection
        },
      ]
    };
  }

  @computed get opinion() {
    return {
      heading: t('Appointments.Opinion'),
      list: [
        {
          name: t('Appointments.DoctorOpinion'),
          description: this.medicalOpinion
        }
      ]
    };
  }

  @computed get advices() {
    return {
      heading: t('Appointments.Advices'),
      list: [
        {
          name: t('Appointments.MedicalAdvice'),
          description: this.medicalAdvice
        }
      ]
    };
  }

}

export default PatientAppointmentState;