import { types } from 'mobx-state-tree';

const Owner = types.model('Owner', {
  id: types.string,
  first_name: types.string,
  last_name: types.string,
  middle_name: types.string,
});

const Message = types.model('Message', {
  title: types.string,
  body: types.string,
  data: types.frozen(),
});

const Notification = types.model('Notification', {
  id: types.identifier,
  created_at: types.string,
  updated_at: types.string,
  category: types.string,
  message: Message,
  owner: Owner,
  status: types.enumeration(['unread', 'read']),
});

export default { Notification };
