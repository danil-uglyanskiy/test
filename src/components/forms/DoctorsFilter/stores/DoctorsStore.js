import { types, applySnapshot, applyPatch, getSnapshot } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';
import Doctor from './Doctor';

const DoctorsStore = types
  .model('DoctorsStore', {
    data: types.optional(
      types.array(Doctor),
      [],
    ),
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
    },
    get selectOptions() {
      return getSnapshot(self.data);
    }
  }))
  .actions(self => ({
    fetch(values = {}) {
      self.setState('pending');

      let params = {
        ...values
      };

      return instance.get('/api/doctors', { params })
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

    updateStore(response) {
      const { data: { data }, status } = response;

      if (status === 200) {
        const patch = { op: "fetch", path: '/data/-', value: data };

        applyPatch(self, patch);
      }
    },

    errorHandler(error) {
      self.setState('error');
      return Promise.reject(error);
    },

    clear() {
      return null;
    },
  }));

export default DoctorsStore;
