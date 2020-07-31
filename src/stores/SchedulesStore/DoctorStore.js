import { types, applySnapshot } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';

import instance from 'connection/instance';
import Doctor from './Doctor';

const DoctorStore = types
  .model('DoctorStore', {
    data: types.maybeNull(Doctor),
    state: types.maybeNull(storeModelStateTypes),
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
    }
  }))
  .actions(self => ({
    fetch(id, params = {}) {
      self.setState('pending');

      return instance.get(`/api/doctors/${id}/profile`, { params })
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

export default DoctorStore;
