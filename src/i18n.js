import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          welcome: "Xhosa Translation Assistant",
          subtitle: "Type your message and get Xhosa translations",
          about: "About This Tool",
          aboutText: "This tool helps you communicate in Xhosa by understanding your intent and providing appropriate responses."
        }
      },
      xh: {
        translation: {
          welcome: "Uncedo Lokuguqula isiXhosa",
          subtitle: "Bhala umyalezo wakho ufumane iinguqulelo zesiXhosa",
          about: "Malunga nesi Sixhobo",
          aboutText: "Esi sixhobo sikunceda unxibelelane ngesiXhosa ngokukuqonda injongo yakho nokunike impendulo efanelekileyo."
        }
      }
    }
  });

export default i18n; 