import "intl-pluralrules";
export type I18nInitializer = (resources: Record<string, object>, options?: Partial<I18nInitOptions>) => void;
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
/**
 * Configura un inizializzatore personalizzato per i18n
 * @param initializer - Funzione personalizzata per inizializzare i18n
 */
export declare const setI18nInitializer: (initializer: I18nInitializer) => void;
/**
 * Inizializza i18n con le risorse di traduzione e opzioni personalizzate
 * @param resources - Dizionario delle risorse di traduzione per lingua
 * @param options - Opzioni di configurazione
 * @returns L'istanza i18n inizializzata
 */
declare const initializeI18n: (resources: Record<string, object>, options?: Partial<I18nInitOptions>) => void;
export default initializeI18n;
