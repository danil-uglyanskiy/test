import { types } from 'mobx-state-tree';

const AvatarVersions = types
  .model('AvatarVersions', {
    original: types.string,
    thumb: types.string,
  });

export default types
  .model('Avatar', {
    id: types.string,
    image_urls: AvatarVersions,
  });