import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './langs/en';
import pt from './langs/pt';

i18next.use(LanguageDetector).init({
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
  resources: {
    en: en,
    pt: pt,
  },
});

export default i18next;
