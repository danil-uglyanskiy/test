import { types } from 'mobx-state-tree';

import Members from './Members';
import Messages from './Messages';

export default types
  .model('Conversation', {
    members: types.optional(types.array(Members), []),
    messages: types.optional(types.array(Messages), [])
  });