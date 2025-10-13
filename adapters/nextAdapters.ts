
import { TranslationAdapter } from "../useTranslatedText";

/**
 * Crea un adapter per next-intl
 * Funziona solo in ambiente Next.js con next-intl installato
 */
export const createNextIntlAdapter = (): TranslationAdapter => {
  return {
    getTranslator: (namespace?: string) => {
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
                return t(key, options as Record<string, any>);
              } catch (error) {
                console.warn(`Translation key not found: ${key}`);
                return key;
              }
            },
          };
        } catch (error) {
          // Errore nell'usare useTranslations
          console.warn("Errore nell'utilizzare useTranslations di next-intl", error);
          return { translate: (key) => key };
        }
      } catch (error) {
        // next-intl non è installato
        console.warn(
          "next-intl non è installato, usando traduzione di fallback"
        );
        return { translate: (key) => key };
      }
    },
    name: "intl",
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
