import initializeI18n, { setI18nInitializer, I18nInitOptions } from './i18n';
import { useTranslatedText, setTranslationAdapter, TranslationAdapter, TranslationFunction } from './useTranslatedText';
export { initializeI18n, setI18nInitializer, useTranslatedText, setTranslationAdapter, };
export type { I18nInitOptions, TranslationAdapter, TranslationFunction, };
export declare const adapters: {
    i18next: (instance?: import("i18next").i18n) => TranslationAdapter;
    reactI18next: () => TranslationAdapter;
    static: (translations: Record<string, Record<string, string>>) => TranslationAdapter;
    nextIntl: () => TranslationAdapter;
};
