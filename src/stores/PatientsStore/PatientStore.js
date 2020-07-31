import { applySnapshot, types } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';

import Patient from './DetailPatient';
import instance from 'connection/instance';

const PatientStore = types
  .model('PatientStore', {
    state: types.maybeNull(storeModelStateTypes),
    data: types.maybe(Patient)
  })
  .views(self => ({
    get isFetched() {
      return self.state === 'done';
    },
    get isPending() {
      return self.state === 'pending';
    },
    get isError() {
      return self.state === 'error';
    },
  }))
  .actions(self => ({
    fetch(id, params = {}) {
      self.setState('pending');

      return instance.get(`/api/patients/${id}`, { params })
        .then(response => self.resetStore(response))
        .catch(error => self.errorHandler(error));
    },

    update(id, values = {}) {
      self.setState('pending');
      const data = {
        ...values,
      };

      return instance.put(`/api/patients/${id}`, { data })
        .then(response => self.resetStore(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    delete(id) {
      self.setState('pending');

      return instance.delete(`/api/patients/${id}`)
        .then(response => self.resetStore(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    setState(state) {
      self.state = state;
      return self;
    },

    resetStore(response) {
      const { status, data } = response;
      if (status === 200) {
        applySnapshot(self, data);
      }

      return self;
    },

    errorHandler(error) {
      self.setState('error');
      return Promise.reject(error);
    },

    clear() {
      return null;
    },
  }));

export default PatientStore;
