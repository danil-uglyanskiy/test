import ru from 'i18next-icu/locale-data/ru';
import locales from 'locales';

export default {
  resources: locales,
  lng: 'ru',
  fallbackLng: 'ru',
  whitelist: ['ru'],
  keySeparator: false,
  i18nFormat: {
    localeData: ru,
    formats: {
      number: {
        RUB: {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      }
    }
  }
};
