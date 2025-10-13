import initializeI18n, { setI18nInitializer, I18nInitOptions } from './i18n';
import { useTranslatedText, setTranslationAdapter, TranslationAdapter, TranslationFunction } from './useTranslatedText';
import { createI18nextAdapter, createReactI18nextAdapter, createStaticAdapter } from './adapters/basicAdapters';
import { createNextIntlAdapter } from './adapters/nextAdapters';

// Esportazioni principali
export {
  initializeI18n,
  setI18nInitializer,
  useTranslatedText,
  setTranslationAdapter,
};

// Esportazioni dei tipi
export type {
  I18nInitOptions,
  TranslationAdapter,
  TranslationFunction,
};

// Esportazioni degli adapter predefiniti
export const adapters = {
  i18next: createI18nextAdapter,
  reactI18next: createReactI18nextAdapter,
  static: createStaticAdapter,
  nextIntl: createNextIntlAdapter,
  //nextI18next: createNextI18nextAdapter,
};
