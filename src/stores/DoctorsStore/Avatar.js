import { types } from 'mobx-state-tree';

const AvatarVersions = types
  .model('AvatarVersions', {
    original: types.maybeNull(types.string),
    thumb: types.maybeNull(types.string),
  });

export default types
  .model('Avatar', {
    id: types.string,
    image_urls: types.maybeNull(AvatarVersions),
  });
