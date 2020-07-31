import { types, applySnapshot, applyPatch } from 'mobx-state-tree';

import Patient from './Patient';
import instance from 'connection/instance';

const PatientsStore = types
  .model('PatientsStore', {
    data: types.optional(
      types.array(Patient),
      [],
    ),
    total: types.maybe(types.number)
  })
  .actions(self => ({
    fetch(values = {}) {

      let params = {
        ...values
      };
      params = { data: params };

      return instance.get('/api/patients', { params })
        .then(response => self.resetStore(response))
        .catch(error => self.errorHandler(error));
    },

    add(values = {}) {
      const data = {
        ...values,
      };

      return instance.post('/api/doctors', { data })
        .then(response => self.updateStore(response))
        .catch(error => self.errorHandler(error));
    },

    resetStore(response) {
      const { status } = response;
      const data = { data: response.data.data, total: response.data.meta.total };

      if (status === 200) {
        applySnapshot(self, data);
      }

      return self;
    },

    updateStore(response) {
      const { data: { data }, status } = response;

      if (status === 200) {
        const patch = { op: "add", path: '/data/-', value: data };

        applyPatch(self, patch);
      }
    },

    errorHandler(error) {
      return Promise.reject(error);
    },

    clear() {
      return null;
    },
  }));

export default PatientsStore;
