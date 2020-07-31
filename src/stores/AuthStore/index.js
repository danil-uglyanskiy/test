import { types, applySnapshot } from 'mobx-state-tree';
import _pick from 'lodash/pick';
import store from 'store';
import instance from 'connection/instance';
import { verifyJWT } from 'utils/jwt';
import { Payload } from './Payload';
import { User } from './User';

const USER_ATTRS = [
  'id',
  'avatar',
  'email',
  'phone',
  'role',
  'first_name',
  'last_name',
  'middle_name',
  'token',
  'payload',
  'specializations',
];

const AuthStore = types
  .model('AuthStore', {
    user: types.maybe(User),
    token: types.maybe(types.string),
    payload: types.maybe(Payload),
  })
  .views(self => ({
    get authenticated() {
      return self.payload && !self.payload.expired;
    },
    get bearerToken() {
      if (!self.token) {
        return undefined;
      }

      return ['Bearer', self.token].join(' ');
    },
  }))
  .actions(self => ({
    afterCreate() {
      const data = self.readFromLocalStorage();
      if (!data) return;

      self.setDefaultsHeader(data);
      self.updateUser(data);
    },

    login(values = {}) {
      const payload = { user: values };
      const config = {
        headers: { Authorization: null },
      };

      return instance.post('/api/auth/sign_in', payload, config)
        .then(response => verifyJWT(response))
        .then(data => self.setDefaultsHeader(data))
        .then(data => self.writeToLocalStorage(data))
        .then(data => self.updateUser(data));
    },

    logout() {
      instance.delete('/api/auth/sign_out')
        .then(() => {
          store.remove('authStore');
          self.updateUser({});
          self.unsetDefaultHeader();
        });
    },

    assignSettings(response) {
      const { setting } = response.data.client;
      applySnapshot(self.setting, setting);
    },

    updateUser(data) {
      applySnapshot(self, data);
      return data;
    },

    setDefaultsHeader(data) {
      const { token } = data;
      instance.defaults.headers.common.Authorization = ['Bearer', token].join(' ');

      return data;
    },

    unsetDefaultHeader() {
      instance.defaults.headers.common.Authorization = undefined;
    },

    writeToLocalStorage(data) {
      let json = _pick(data, USER_ATTRS);
      const { payload, token, ...user } = json;
      json = { user, payload, token };

      store.set('authStore', json);

      return json;
    },

    readFromLocalStorage() {
      return store.get('authStore');
    },
  }));

export default AuthStore;
