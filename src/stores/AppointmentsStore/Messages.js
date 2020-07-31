import { types } from 'mobx-state-tree';
import Attachment from './Attachment';

const From = types.model('from', {
    id: types.identifier,
    type: types.string
});

export default types
  .model('Members', {
    id: types.identifier,
    created_at: types.string,
    text: types.string,
    from: From,
    attachments: types.optional(types.array(Attachment), [])
  });