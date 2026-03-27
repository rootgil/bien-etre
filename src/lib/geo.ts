import type { CountryConfig, Locale } from "@/types";

export const COUNTRY_CONFIG: Record<string, CountryConfig> = {
  GN: {
    currency: "GNF",
    currencySymbol: "FG",
    locale: "fr",
    countryName: { fr: "Guinée", en: "Guinea" },
  },
  CI: {
    currency: "XOF",
    currencySymbol: "CFA",
    locale: "fr",
    countryName: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
  },
  SN: {
    currency: "XOF",
    currencySymbol: "CFA",
    locale: "fr",
    countryName: { fr: "Sénégal", en: "Senegal" },
  },
  ML: {
    currency: "XOF",
    currencySymbol: "CFA",
    locale: "fr",
    countryName: { fr: "Mali", en: "Mali" },
  },
  BF: {
    currency: "XOF",
    currencySymbol: "CFA",
    locale: "fr",
    countryName: { fr: "Burkina Faso", en: "Burkina Faso" },
  },
  CM: {
    currency: "XAF",
    currencySymbol: "FCFA",
    locale: "fr",
    countryName: { fr: "Cameroun", en: "Cameroon" },
  },
  GH: {
    currency: "GHS",
    currencySymbol: "₵",
    locale: "en",
    countryName: { fr: "Ghana", en: "Ghana" },
  },
  FR: {
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr",
    countryName: { fr: "France", en: "France" },
  },
  BE: {
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr",
    countryName: { fr: "Belgique", en: "Belgium" },
  },
  CH: {
    currency: "CHF",
    currencySymbol: "CHF",
    locale: "fr",
    countryName: { fr: "Suisse", en: "Switzerland" },
  },
  CA: {
    currency: "CAD",
    currencySymbol: "CA$",
    locale: "fr",
    countryName: { fr: "Canada", en: "Canada" },
  },
  US: {
    currency: "USD",
    currencySymbol: "$",
    locale: "en",
    countryName: { fr: "États-Unis", en: "United States" },
  },
  GB: {
    currency: "GBP",
    currencySymbol: "£",
    locale: "en",
    countryName: { fr: "Royaume-Uni", en: "United Kingdom" },
  },
};

export const FRENCH_SPEAKING_COUNTRIES = new Set([
  "GN", "CI", "SN", "ML", "BF", "CM", "FR", "BE", "CH", "CA",
  "DZ", "MA", "TN", "LU", "MC", "CD", "MG", "NE", "TD", "GW",
  "DJ", "KM", "MU", "SC", "BI", "RW", "BJ", "TG", "GA", "CG",
  "CF", "GQ", "MR", "HT", "VU",
]);

export function getLocaleForCountry(countryCode: string): Locale {
  if (COUNTRY_CONFIG[countryCode]) {
    return COUNTRY_CONFIG[countryCode].locale;
  }
  return FRENCH_SPEAKING_COUNTRIES.has(countryCode) ? "fr" : "en";
}

export function getCurrencyForCountry(countryCode: string): { currency: string; currencySymbol: string } {
  if (COUNTRY_CONFIG[countryCode]) {
    return {
      currency: COUNTRY_CONFIG[countryCode].currency,
      currencySymbol: COUNTRY_CONFIG[countryCode].currencySymbol,
    };
  }
  return { currency: "EUR", currencySymbol: "€" };
}

export const FALLBACK_GEO = {
  country: "France",
  countryCode: "FR",
  currency: "EUR",
  currencySymbol: "€",
  locale: "fr" as Locale,
};
