import { types } from 'mobx-state-tree';

const Organization = types.model('Organization', {
  id: types.identifier,
  title: types.string,
});

export default Organization;