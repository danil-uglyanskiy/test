import { types, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { storeModelStateTypes } from 'types/mobx-state-tree';
import instance from 'connection/instance';

import Organization from './Organization';

const OrganizationStore = types
  .model('OrganizationStore', {
    data: types.optional(types.array(Organization), []),
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

      return instance.get('/api/classifiers/organizations', { params })
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

export default OrganizationStore;