import i18n from "i18next";
import "intl-pluralrules";

// Tipo per l'adapter di inizializzazione i18n
export type I18nInitializer = (
  resources: Record<string, object>,
  options?: Partial<I18nInitOptions>
) => void;

// Opzioni di configurazione per l'inizializzazione
export interface I18nInitOptions {
  defaultLanguage?: string;
  fallbackLanguage?: string | string[];
  debug?: boolean;
  interpolation?: {
    escapeValue?: boolean;
    [key: string]: any;
  };
  detection?: {
    order?: string[];
    lookupLocalStorage?: string;
    caches?: string[];
    [key: string]: any;
  };
  backend?: {
    loadPath?: string;
    addPath?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Funzione di inizializzazione predefinita
let i18nInitializer: I18nInitializer = (resources, options = {}) => {
  console.log("Inizializzatore i18n predefinito in uso. Considera di impostarne uno personalizzato.");
  const lngs = Object.keys(resources);
  const defaultLng = options.defaultLanguage || lngs[0];
  const fallbackLng = options.fallbackLanguage || { default: lngs };
        const { initReactI18next } = require('react-i18next');
  
  i18n.use(initReactI18next).init({
    lng: defaultLng,
    resources: Object.entries(resources).reduce(
      (prev, [key, val]) => ({ ...prev, [key]: val }),
      {}
    ),
    interpolation: {
      escapeValue: false,
      ...options.interpolation,
    },
    supportedLngs: lngs,
    fallbackLng,
    debug: options.debug || false,
    detection: options.detection,
    backend: options.backend,
    ...options,
  });

  return i18n;
};

/**
 * Configura un inizializzatore personalizzato per i18n
 * @param initializer - Funzione personalizzata per inizializzare i18n
 */
export const setI18nInitializer = (initializer: I18nInitializer): void => {
  i18nInitializer = initializer;
};

/**
 * Inizializza i18n con le risorse di traduzione e opzioni personalizzate
 * @param resources - Dizionario delle risorse di traduzione per lingua
 * @param options - Opzioni di configurazione
 * @returns L'istanza i18n inizializzata
 */
const initializeI18n = (
  resources: Record<string, object>,
  options: Partial<I18nInitOptions> = {}
) => {
  return i18nInitializer(resources, options);
};

export default initializeI18n;
