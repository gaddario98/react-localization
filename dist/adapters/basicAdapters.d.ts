import { TranslationAdapter } from '../useTranslatedText';
import i18n from 'i18next';
/**
 * Crea un adapter per i18next che funziona sia lato client che server
 * @param instance - Opzionale: istanza i18n da utilizzare
 * @returns L'adapter configurato
 */
export declare const createI18nextAdapter: (instance?: typeof i18n) => TranslationAdapter;
/**
 * Crea un adapter per react-i18next (ambiente React)
 */
export declare const createReactI18nextAdapter: () => TranslationAdapter;
/**
 * Crea un adapter che utilizza un dizionario statico di traduzioni
 * @param translations - Dizionario delle traduzioni per namespace
 */
export declare const createStaticAdapter: (translations: Record<string, Record<string, string>>) => TranslationAdapter;
