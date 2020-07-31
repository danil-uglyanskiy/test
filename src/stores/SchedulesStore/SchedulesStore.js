import { types, applySnapshot, applyPatch } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';
import ScheduleItem from './ScheduleItem';

const SchedulesStore = types
  .model('SchedulesStore', {
    data: types.optional(
      types.array(ScheduleItem),
      []
    ),
    state: types.maybeNull(storeModelStateTypes)
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
    fetch(values = {}) {
      self.setState('pending');

      let params = {
        ...values
      };
      params = { data: params };

      return instance.get('/api/schedules/capacity', { params })
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

export default SchedulesStore;