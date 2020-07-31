import { types } from 'mobx-state-tree';
import Avatar from "./Avatar";

const Education = types.model('Education', {
  title: types.maybeNull(types.string),
  from_date: types.maybeNull(types.string),
  to_date: types.maybeNull(types.string)
});

export default Education;