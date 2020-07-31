import { types, applySnapshot, applyPatch } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';
import EditScheduleSlot from './EditScheduleSlot';

function adoptData(data) {
    return {
        ...data,
        data: data.data.reduce((acc, {day, slots = []}) => {
            acc[day] = slots.map(({ ...slot } ) => slot);

            return acc;
        }, {})
    };
}

const EditScheduleStore = types
  .model('EditScheduleStore', {
    data: types.map(types.array(EditScheduleSlot)),
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
    fetch(data = {}) {
        self.setState('pending');

        return instance.get(`/api/schedules/doctors_capacity`, {params: {data}})
          .then(response => self.resetStore(response))
          .then(() => self.setState('done'))
          .catch(error => self.errorHandler(error));
      },

    update(data = {}) {
      self.setState('pending');

      return instance.put('/api/schedules/update_slots', { data })
        .then(() => self.setState('done'))
        .catch(error => self.errorHandler(error));
    },

    setState(state) {
      self.state = state;
      return self;
    },

    resetStore({ status, data }) {
      if (status === 200) {
        applySnapshot(self, adoptData(data));
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

export default EditScheduleStore;
