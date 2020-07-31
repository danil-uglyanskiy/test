import { types } from 'mobx-state-tree';

const Organization = types
  .model('Organization', {
    id: types.identifier,
    title: types.string,
  });

const Workplace = types
  .model('Workplace', {
    id: types.identifier,
    from_date: types.string,
    to_date: types.maybeNull(types.string),
    organization: types.maybeNull(Organization),
  });

export default types
  .model('Experience', {
    description: types.optional(types.string, 'неизвестно'),
    workplaces: types.array(Workplace),
  });