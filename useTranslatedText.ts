import { useCallback } from "react";
import type { TOptions } from "i18next";

// Tipo per la funzione di traduzione
export type TranslationFunction = (key: string, options?: TOptions) => string;

// Configurazione globale per il traduttore
export interface TranslationAdapter {
  getTranslator: (namespace?: string) => { translate: TranslationFunction };
  name?: string; // Nome dell'adapter, utile per debug
}

// Adapter predefinito per react-i18next
let translationAdapter: TranslationAdapter = {
  getTranslator: (namespace?: string) => {
    try {
      // Import dinamico per evitare problemi in ambiente server
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useTranslation } = require("react-i18next");
      const { t } = useTranslation(namespace);
      return { translate: t };
    } catch (error) {
      // Fallback nel caso react-i18next non sia disponibile
      console.warn(
        "react-i18next non disponibile, usando traduzione di fallback"
      );
      return {
        translate: (key: string) => key,
      };
    }
  },
  name: "base",
};

/**
 * Imposta un adapter personalizzato per le traduzioni
 * @param adapter - Adapter personalizzato che fornisce il traduttore
 */
export const setTranslationAdapter = (adapter: TranslationAdapter): void => {
  translationAdapter = adapter;
};

/**
 * Hook per tradurre testi che si adatta al sistema di traduzione configurato
 * @param ns - Namespace opzionale per le traduzioni
 * @returns Un oggetto con la funzione traslateText
 */
export const useTranslatedText = (ns?: string) => {
  const { translate } = translationAdapter.getTranslator(ns);

  const traslateText = useCallback(
    (text: string, options?: TOptions) => {
      if (!text) return "";
      return translate(text, options);
    },
    [translate, ns]
  );

  return { traslateText };
};
