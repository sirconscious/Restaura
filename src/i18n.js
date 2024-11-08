import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '/public/locales/en/en.json';
import fr from '/public/locales/fr/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    lng: 'en',  // Set the default language here
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes variables
    }
  });

export default i18n;
