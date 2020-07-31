import fixtures from './filterParamsMapper.fixture';
import { filterParamsMapper } from './filterParamsMapper';

test('Should return filters', () => {

  const params = filterParamsMapper(fixtures);
  const actualParams = {
    chars: 'a',
    policy_number: '1'
  };

  expect(actualParams).toStrictEqual(params);
});