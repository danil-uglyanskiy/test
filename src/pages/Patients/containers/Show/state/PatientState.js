import { observable, computed, action } from "mobx";
import { PatientStore } from 'stores/PatientsStore';

import { t } from 'utils/localization';
import moment from 'utils/moment';

function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
class PatientState {
    @observable id;
    @observable appointmentId;

    constructor(id, appointmentId, type) {
        this.id = id;
        this.appointmentId = appointmentId;
        this.initStore();
        type && this.setType(type);
    }

    //initialization
    @observable patientStore;

    @action
    initStore = () => {
        this.patientStore = PatientStore.create();
    }

    @action
    dispose = () => {
        this.patientStore = undefined;
        this.clearPatient();
    }

    //patient
    @observable patient;

    @action
    setPatient = (patient) => {
        this.patient = patient;
    }

    @action
    clearPatient = () => {
        this.patient = undefined;
    }

    async fetch() {
        this.setState('pending');
        const patient = await this.patientStore.fetch(this.id);
        this.setPatient(patient.data.toJSON());
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

    //type
    @observable type = 'info';

    @action
    setType = (type) => {
        this.type = type;
    }

    //params

    @computed get gender() {
        const { gender } = this.patient;
    
        return t(`UI.${ucFirst(gender)}`);
      }
    
      @computed get age() {
        const years = moment().diff(moment(this.patient.birth_date), 'years');
    
        return t('UI.Age', { count: years });
      }
    
      @computed get avatar() {
        return this.patient.avatar?.image_urls.thumb;
      }
    
      @computed get fullName() {
        const { first_name, last_name, middle_name } = this.patient;
    
        return `${last_name} ${first_name} ${middle_name}`;
      }
    
      @computed get medications() {
        return this.patient.medications.map(medication => ({
          name: medication.trade_name,
          extra: t('UI.CreatedAt', { date: moment(medication.created_at).format('DD.MM.YYYY') })
        }));
      }
    
      @computed get diseases() {
        return this.patient.diseases;
      }
    
      @computed get allergies() {
        return this.patient.allergies;
      }
    
      @computed get insurers() {
        return this.patient.insurers;
      }
}

export default PatientState;