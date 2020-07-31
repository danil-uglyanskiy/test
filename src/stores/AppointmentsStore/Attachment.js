import { types } from 'mobx-state-tree';

export default types
  .model('Attachment', {
    id: types.string,
    description: types.maybeNull(types.string),
    url: types.string
  });