import { types, applySnapshot } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';

import Appointment from './Appointment';

const AppointmentStore = types
  .model('AppointmentStore', {
    data: types.maybeNull(Appointment),
    state: types.maybeNull(storeModelStateTypes)
  })
  .actions(self => ({
    fetch(id, values={}) {
      let params = { ...values };
      params = { data: params };
      return instance.get(`/api/appointments/${id}`, { params })
        .then(response => self.resetStore(response))
        .catch(error => self.errorHandler(error));
    },
    
    resetStore(response) {
      const { status, data } = response;
      if (status === 200) {
        applySnapshot(self, data);
      }

      return self;
    },

    errorHandler(error) {
      return Promise.reject(error);
    },

    clear() {
      return null;
    },
  }));

export default AppointmentStore;