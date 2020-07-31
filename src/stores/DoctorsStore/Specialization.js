import { types } from 'mobx-state-tree';
import Avatar from "./Avatar";

export default types
  .model('Specialization', {
    id: types.string,
    name: types.maybeNull(types.string),
    type: types.maybeNull(types.string)
  });
