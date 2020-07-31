import { types } from 'mobx-state-tree';

export const Payload = types
  .model('Payload', {
    exp: types.number,
    iat: types.number,
    jti: types.string,
    scp: types.string,
    sub: types.string,
  })
  .views(() => ({
    get expired() {
      return this.exp * 1000 <= new Date().getTime();
    },
  }));
