import { types } from 'mobx-state-tree';
import Avatar from "./Avatar";

export default types
  .model('Organization', {
    id: types.string,
    title: types.maybeNull(types.string),
  });
