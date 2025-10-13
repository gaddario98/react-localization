import i18n from 'i18next';
import 'intl-pluralrules';
import { c } from 'react/compiler-runtime';
import 'react';

// Funzione di inizializzazione predefinita
let i18nInitializer = (resources, options = {}) => {
  console.log("Inizializzatore i18n predefinito in uso. Considera di impostarne uno personalizzato.");
  const lngs = Object.keys(resources);
  const defaultLng = options.defaultLanguage || lngs[0];
  const fallbackLng = options.fallbackLanguage || {
    default: lngs
  };
  const {
    initReactI18next
  } = require('react-i18next');
  i18n.use(initReactI18next).init(Object.assign({
    lng: defaultLng,
    resources: Object.entries(resources).reduce((prev, [key, val]) => Object.assign(Object.assign({}, prev), {
      [key]: val
    }), {}),
    interpolation: Object.assign({
      escapeValue: false
    }, options.interpolation),
    supportedLngs: lngs,
    fallbackLng,
    debug: options.debug || false,
    detection: options.detection,
    backend: options.backend
  }, options));
  return i18n;
};
/**
 * Configura un inizializzatore personalizzato per i18n
 * @param initializer - Funzione personalizzata per inizializzare i18n
 */
const setI18nInitializer = initializer => {
  i18nInitializer = initializer;
};
/**
 * Inizializza i18n con le risorse di traduzione e opzioni personalizzate
 * @param resources - Dizionario delle risorse di traduzione per lingua
 * @param options - Opzioni di configurazione
 * @returns L'istanza i18n inizializzata
 */
const initializeI18n = (resources, options = {}) => {
  return i18nInitializer(resources, options);
};

// Adapter predefinito per react-i18next
let translationAdapter = {
  getTranslator: namespace => {
    try {
      // Import dinamico per evitare problemi in ambiente server
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const {
        useTranslation
      } = require("react-i18next");
      const {
        t
      } = useTranslation(namespace);
      return {
        translate: t
      };
    } catch (error) {
      // Fallback nel caso react-i18next non sia disponibile
      console.warn("react-i18next non disponibile, usando traduzione di fallback");
      return {
        translate: key => key
      };
    }
  },
  name: "base"
};
/**
 * Imposta un adapter personalizzato per le traduzioni
 * @param adapter - Adapter personalizzato che fornisce il traduttore
 */
const setTranslationAdapter = adapter => {
  translationAdapter = adapter;
};
/**
 * Hook per tradurre testi che si adatta al sistema di traduzione configurato
 * @param ns - Namespace opzionale per le traduzioni
 * @returns Un oggetto con la funzione traslateText
 */
const useTranslatedText = ns => {
  const $ = c(6);
  let t0;
  if ($[0] !== ns) {
    t0 = translationAdapter.getTranslator(ns);
    $[0] = ns;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const {
    translate
  } = t0;
  let t1;
  if ($[2] !== translate) {
    t1 = (text, options) => {
      if (!text) {
        return "";
      }
      return translate(text, options);
    };
    $[2] = translate;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const traslateText = t1;
  let t2;
  if ($[4] !== traslateText) {
    t2 = {
      traslateText
    };
    $[4] = traslateText;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  return t2;
};

/**
 * Crea un adapter per i18next che funziona sia lato client che server
 * @param instance - Opzionale: istanza i18n da utilizzare
 * @returns L'adapter configurato
 */
const createI18nextAdapter = (instance = i18n) => {
  return {
    getTranslator: namespace => {
      return {
        translate: (key, options) => {
          const ns = namespace || 'common';
          try {
            return instance.t(key, Object.assign(Object.assign({}, options), {
              ns
            }));
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
const createReactI18nextAdapter = () => {
  return {
    getTranslator: namespace => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const {
          useTranslation
        } = require('react-i18next');
        const {
          t
        } = useTranslation(namespace);
        return {
          translate: t
        };
      } catch (error) {
        console.warn('react-i18next non disponibile, usando fallback');
        return {
          translate: key => key
        };
      }
    }
  };
};
/**
 * Crea un adapter che utilizza un dizionario statico di traduzioni
 * @param translations - Dizionario delle traduzioni per namespace
 */
const createStaticAdapter = translations => {
  return {
    getTranslator: namespace => {
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
            return Object.entries(options).reduce((acc, [paramKey, paramValue]) => acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)), translation);
          }
          return translation;
        }
      };
    }
  };
};

/**
 * Crea un adapter per next-intl
 * Funziona solo in ambiente Next.js con next-intl installato
 */
const createNextIntlAdapter = () => {
  return {
    getTranslator: namespace => {
      try {
        // Tentativo di importare next-intl
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const nextIntl = require("next-intl");
        const useTranslations = nextIntl.useTranslations;
        try {
          const t = useTranslations(namespace || "");
          return {
            translate: (key, options) => {
              try {
                return t(key, options);
              } catch (error) {
                console.warn(`Translation key not found: ${key}`);
                return key;
              }
            }
          };
        } catch (error) {
          // Errore nell'usare useTranslations
          console.warn("Errore nell'utilizzare useTranslations di next-intl", error);
          return {
            translate: key => key
          };
        }
      } catch (error) {
        // next-intl non è installato
        console.warn("next-intl non è installato, usando traduzione di fallback");
        return {
          translate: key => key
        };
      }
    },
    name: "intl"
  };
};
/**
 * Crea un adapter per next-i18next
 * Funziona solo in ambiente Next.js con next-i18next installato

export const createNextI18nextAdapter = (): TranslationAdapter => {
  return {
    getTranslator: (namespace?: string) => {
      try {
        // Tentativo di importare next-i18next
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { useTranslation } = require("next-i18next");
        const { t } = useTranslation(namespace || "common");

        return { translate: t };
      } catch (error) {
        // next-i18next non è installato
        console.warn(
          "next-i18next non è installato, usando traduzione di fallback"
        );
        return { translate: (key) => key };
      }
    },
  };
}; */

// Esportazioni degli adapter predefiniti
const adapters = {
  i18next: createI18nextAdapter,
  reactI18next: createReactI18nextAdapter,
  static: createStaticAdapter,
  nextIntl: createNextIntlAdapter
  //nextI18next: createNextI18nextAdapter,
};

export { adapters, initializeI18n, setI18nInitializer, setTranslationAdapter, useTranslatedText };
//# sourceMappingURL=index.mjs.map
