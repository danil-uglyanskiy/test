export function shortName({ last_name, middle_name, first_name }) {
  return `${last_name} ${first_name[0]}. ${middle_name[0]}.`;
}
