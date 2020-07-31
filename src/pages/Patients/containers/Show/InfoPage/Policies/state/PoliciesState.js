import { observable, action, computed } from "mobx";

import ListStore from 'stores/PatientsStore/PoliciesStore/ListStore';

class PoliciesState {

  @observable id;

  constructor(id) {
    this.id = id;
    this.initStore();
  }

  //initialization
  @observable policiesStore;

  initStore = () => {
    this.policiesStore = ListStore.create();
  }

  dispose = () => {

  }

  //policies
  @observable.ref childrensPolicies = [];
  @observable.ref policies = [];

  @action
  setPolicies = ({policies, childrens_policies}) => {
    this.policies = policies;
    this.childrensPolicies = childrens_policies;
  }

  @action
  clearPolicies = () => {
    this.childrensPolicies = [];
    this.policies = [];
  }

  async fetchPolicies() {
    this.setState('pending');
    const policies = await this.policiesStore.fetch(this.id);
    this.setPolicies(policies.data.toJSON());
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
}

export default PoliciesState;