import { TranslationAdapter } from "../useTranslatedText";
/**
 * Crea un adapter per next-intl
 * Funziona solo in ambiente Next.js con next-intl installato
 */
export declare const createNextIntlAdapter: () => TranslationAdapter;
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
