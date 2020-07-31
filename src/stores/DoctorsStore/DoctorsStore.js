import { types, applySnapshot, applyPatch } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';
import DoctorItem from './DoctorItem';

const DoctorsStore = types
  .model('DoctorsStore', {
    data: types.optional(
      types.array(DoctorItem),
      [],
    ),
    state: types.maybeNull(storeModelStateTypes),
    total: types.maybe(types.number)
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
    fetch(values = {}) {
      self.setState('pending');

      let params = {
        ...values,
        states: ['completed'],
      };
      params = { data: params };

      return instance.get('/api/doctors', { params })
        .then(response => self.resetStore(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    add(data = {}) {
      self.setState('pending');

      return instance.post('/api/doctors', data)
        .then(response => self.updateStore(response))
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    setState(state) {
      self.state = state;
      return self;
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
      self.setState('error');
      return Promise.reject(error);
    },

    clear() {
      return null;
    },
  }));

export default DoctorsStore;
