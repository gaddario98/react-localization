import type { TOptions } from "i18next";
export type TranslationFunction = (key: string, options?: TOptions) => string;
export interface TranslationAdapter {
    getTranslator: (namespace?: string) => {
        translate: TranslationFunction;
    };
    name?: string;
}
/**
 * Imposta un adapter personalizzato per le traduzioni
 * @param adapter - Adapter personalizzato che fornisce il traduttore
 */
export declare const setTranslationAdapter: (adapter: TranslationAdapter) => void;
/**
 * Hook per tradurre testi che si adatta al sistema di traduzione configurato
 * @param ns - Namespace opzionale per le traduzioni
 * @returns Un oggetto con la funzione traslateText
 */
export declare const useTranslatedText: (ns?: string) => {
    traslateText: (text: string, options?: TOptions) => string;
};
