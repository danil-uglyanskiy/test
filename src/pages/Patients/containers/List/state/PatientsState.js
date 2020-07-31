import { observable, action } from "mobx";
import { PatientsStore } from 'stores/PatientsStore';

import { filterParamsMapper } from './utils/filterParamsMapper';

class PatientsState {

  constructor() {
    this.initStore();
  }

  //initialization
  @observable patientsStore;
  @observable.ref params;

  @action
  initStore = () => {
    this.patientsStore = PatientsStore.create();
  };

  dispose = () => {
    this.clearParams();
    this.clearPatients();
  };

  //patients
  @observable patients = [];

  @action
  setPatients = (patients) => {
    this.patients = patients;
  };

  @action
  setParams = (params) => {
    this.params = { ...this.params, ...params };
  }

  @action
  clearParams = () => {
    this.params = {};
  }

  @action
  clearPatients = () => {
    this.patients = [];
  };

  async fetch(page = 1) {
    this.setCurrentPage(page);
    this.setState('pending');
    const patients = await this.patientsStore.fetch({ ...this.params });
    this.setTotalLength(patients.total);
    this.setPatients(patients.data.toJSON());

    this.setState('done');
  }

  //total
  @observable totalLength;

  @action
  setTotalLength = (length) => {
    this.totalLength = length;
  };

  //state
  @observable state = 'done';

  @action
  setState = (state) => {
    this.state = state;
  };

  //pagination
  @observable currentPage = 1;

  @action
  setCurrentPage = (page) => {
    const paginate = {
      page: page,
      limit: 10
    };

    this.setParams({paginate});

    this.currentPage = page;
  }

  @action
  filterParams = (filters) => {
    const params = filterParamsMapper(filters);

    this.setParams(params);
  }

}

export default PatientsState;