import i18n from 'i18next';
import i18nConfig from 'config/i18n';

i18n.init(i18nConfig);

export function t(key, params) {
  return i18n.t(key, params);
}

export function getNameInitials({ first_name, middle_name, last_name }) {
  return [
    last_name,
    ...(first_name ? [`${first_name[0]}.`] : []),
    ...(middle_name ? [`${middle_name[0]}.`] : [])
  ].join(' ');
}
