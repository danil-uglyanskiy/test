import { types } from 'mobx-state-tree';

const AvatarVersions = types.model('AvatarVersions', {
  original: types.string,
  thumb: types.string,
});

const Avatar = types.model('Avatar', {
  id: types.string,
  image_urls: AvatarVersions,
});

export { Avatar };
