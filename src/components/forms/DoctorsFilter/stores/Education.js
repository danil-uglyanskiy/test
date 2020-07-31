import { types } from 'mobx-state-tree';

const Education = types.model('Education', {
  title: types.string,
  from_date: types.string,
  to_date: types.string
});

export default Education;