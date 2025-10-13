import { TranslationAdapter } from '../useTranslatedText';
import i18n from 'i18next';

/**
 * Crea un adapter per i18next che funziona sia lato client che server
 * @param instance - Opzionale: istanza i18n da utilizzare
 * @returns L'adapter configurato
 */
export const createI18nextAdapter = (instance: typeof i18n = i18n): TranslationAdapter => {
  return {
    getTranslator: (namespace?: string) => {
      return {
        translate: (key, options) => {
          const ns = namespace || 'common';
          try {
            return instance.t(key, { ...options, ns });
          } catch (error) {
            console.warn(`Translation key not found: ${key} in namespace: ${ns}`);
            return key;
          }
        }
      };
    }
  };
};

/**
 * Crea un adapter per react-i18next (ambiente React)
 */
export const createReactI18nextAdapter = (): TranslationAdapter => {
  return {
    getTranslator: (namespace?: string) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { useTranslation } = require('react-i18next');
        const { t } = useTranslation(namespace);
        return { translate: t };
      } catch (error) {
        console.warn('react-i18next non disponibile, usando fallback');
        return { translate: (key) => key };
      }
    }
  };
};

/**
 * Crea un adapter che utilizza un dizionario statico di traduzioni
 * @param translations - Dizionario delle traduzioni per namespace
 */
export const createStaticAdapter = (
  translations: Record<string, Record<string, string>>
): TranslationAdapter => {
  return {
    getTranslator: (namespace?: string) => {
      const ns = namespace || 'common';
      return {
        translate: (key, options) => {
          const nsTranslations = translations[ns] || {};
          const translation = nsTranslations[key];
          
          if (!translation) {
            return key;
          }
          
          // Sostituzione dei parametri
          if (options) {
            return Object.entries(options).reduce(
              (acc, [paramKey, paramValue]) => 
                acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)),
              translation
            );
          }
          
          return translation;
        }
      };
    }
  };
};
