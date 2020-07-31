export const filterParamsMapper = (filters) => {
  return filters.reduce((total, current) => {
    return {...total, [current.type]: current.value};
  }, {
    chars: '',
    policy_number: '',
  });
};