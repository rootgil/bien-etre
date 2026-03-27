import type { CountryConfig, Locale } from "@/types";

export const COUNTRY_CONFIG: Record<string, CountryConfig> = {
  // --- Africa ---
  GN: { currency: "GNF", currencySymbol: "FG", locale: "fr", countryName: { fr: "Guinée", en: "Guinea" } },
  CI: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire" } },
  SN: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Sénégal", en: "Senegal" } },
  ML: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Mali", en: "Mali" } },
  BF: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Burkina Faso", en: "Burkina Faso" } },
  BJ: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Bénin", en: "Benin" } },
  TG: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Togo", en: "Togo" } },
  NE: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Niger", en: "Niger" } },
  GW: { currency: "XOF", currencySymbol: "CFA", locale: "fr", countryName: { fr: "Guinée-Bissau", en: "Guinea-Bissau" } },
  CM: { currency: "XAF", currencySymbol: "FCFA", locale: "fr", countryName: { fr: "Cameroun", en: "Cameroon" } },
  TD: { currency: "XAF", currencySymbol: "FCFA", locale: "fr", countryName: { fr: "Tchad", en: "Chad" } },
  CF: { currency: "XAF", currencySymbol: "FCFA", locale: "fr", countryName: { fr: "République centrafricaine", en: "Central African Republic" } },
  CG: { currency: "XAF", currencySymbol: "FCFA", locale: "fr", countryName: { fr: "Congo", en: "Congo" } },
  GA: { currency: "XAF", currencySymbol: "FCFA", locale: "fr", countryName: { fr: "Gabon", en: "Gabon" } },
  GQ: { currency: "XAF", currencySymbol: "FCFA", locale: "fr", countryName: { fr: "Guinée équatoriale", en: "Equatorial Guinea" } },
  CD: { currency: "CDF", currencySymbol: "FC", locale: "fr", countryName: { fr: "Congo (RDC)", en: "DR Congo" } },
  GH: { currency: "GHS", currencySymbol: "₵", locale: "en", countryName: { fr: "Ghana", en: "Ghana" } },
  NG: { currency: "NGN", currencySymbol: "₦", locale: "en", countryName: { fr: "Nigéria", en: "Nigeria" } },
  MA: { currency: "MAD", currencySymbol: "MAD", locale: "fr", countryName: { fr: "Maroc", en: "Morocco" } },
  DZ: { currency: "DZD", currencySymbol: "DZD", locale: "fr", countryName: { fr: "Algérie", en: "Algeria" } },
  TN: { currency: "TND", currencySymbol: "TND", locale: "fr", countryName: { fr: "Tunisie", en: "Tunisia" } },
  EG: { currency: "EGP", currencySymbol: "E£", locale: "en", countryName: { fr: "Égypte", en: "Egypt" } },
  ZA: { currency: "ZAR", currencySymbol: "R", locale: "en", countryName: { fr: "Afrique du Sud", en: "South Africa" } },
  KE: { currency: "KES", currencySymbol: "KSh", locale: "en", countryName: { fr: "Kenya", en: "Kenya" } },
  ET: { currency: "ETB", currencySymbol: "Br", locale: "en", countryName: { fr: "Éthiopie", en: "Ethiopia" } },
  TZ: { currency: "TZS", currencySymbol: "TSh", locale: "en", countryName: { fr: "Tanzanie", en: "Tanzania" } },
  UG: { currency: "UGX", currencySymbol: "USh", locale: "en", countryName: { fr: "Ouganda", en: "Uganda" } },
  RW: { currency: "RWF", currencySymbol: "RF", locale: "fr", countryName: { fr: "Rwanda", en: "Rwanda" } },
  MG: { currency: "MGA", currencySymbol: "Ar", locale: "fr", countryName: { fr: "Madagascar", en: "Madagascar" } },
  MU: { currency: "MUR", currencySymbol: "Rs", locale: "fr", countryName: { fr: "Maurice", en: "Mauritius" } },
  // --- Europe ---
  FR: { currency: "EUR", currencySymbol: "€", locale: "fr", countryName: { fr: "France", en: "France" } },
  BE: { currency: "EUR", currencySymbol: "€", locale: "fr", countryName: { fr: "Belgique", en: "Belgium" } },
  DE: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Allemagne", en: "Germany" } },
  ES: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Espagne", en: "Spain" } },
  IT: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Italie", en: "Italy" } },
  PT: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Portugal", en: "Portugal" } },
  NL: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Pays-Bas", en: "Netherlands" } },
  AT: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Autriche", en: "Austria" } },
  FI: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Finlande", en: "Finland" } },
  IE: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Irlande", en: "Ireland" } },
  GR: { currency: "EUR", currencySymbol: "€", locale: "en", countryName: { fr: "Grèce", en: "Greece" } },
  LU: { currency: "EUR", currencySymbol: "€", locale: "fr", countryName: { fr: "Luxembourg", en: "Luxembourg" } },
  MC: { currency: "EUR", currencySymbol: "€", locale: "fr", countryName: { fr: "Monaco", en: "Monaco" } },
  CH: { currency: "CHF", currencySymbol: "CHF", locale: "fr", countryName: { fr: "Suisse", en: "Switzerland" } },
  GB: { currency: "GBP", currencySymbol: "£", locale: "en", countryName: { fr: "Royaume-Uni", en: "United Kingdom" } },
  SE: { currency: "SEK", currencySymbol: "kr", locale: "en", countryName: { fr: "Suède", en: "Sweden" } },
  NO: { currency: "NOK", currencySymbol: "kr", locale: "en", countryName: { fr: "Norvège", en: "Norway" } },
  DK: { currency: "DKK", currencySymbol: "kr", locale: "en", countryName: { fr: "Danemark", en: "Denmark" } },
  PL: { currency: "PLN", currencySymbol: "zł", locale: "en", countryName: { fr: "Pologne", en: "Poland" } },
  CZ: { currency: "CZK", currencySymbol: "Kč", locale: "en", countryName: { fr: "République tchèque", en: "Czech Republic" } },
  HU: { currency: "HUF", currencySymbol: "Ft", locale: "en", countryName: { fr: "Hongrie", en: "Hungary" } },
  RO: { currency: "RON", currencySymbol: "lei", locale: "en", countryName: { fr: "Roumanie", en: "Romania" } },
  TR: { currency: "TRY", currencySymbol: "₺", locale: "en", countryName: { fr: "Turquie", en: "Turkey" } },
  RU: { currency: "RUB", currencySymbol: "₽", locale: "en", countryName: { fr: "Russie", en: "Russia" } },
  UA: { currency: "UAH", currencySymbol: "₴", locale: "en", countryName: { fr: "Ukraine", en: "Ukraine" } },
  // --- Americas ---
  US: { currency: "USD", currencySymbol: "$", locale: "en", countryName: { fr: "États-Unis", en: "United States" } },
  CA: { currency: "CAD", currencySymbol: "CA$", locale: "fr", countryName: { fr: "Canada", en: "Canada" } },
  BR: { currency: "BRL", currencySymbol: "R$", locale: "en", countryName: { fr: "Brésil", en: "Brazil" } },
  MX: { currency: "MXN", currencySymbol: "MX$", locale: "en", countryName: { fr: "Mexique", en: "Mexico" } },
  AR: { currency: "ARS", currencySymbol: "ARS$", locale: "en", countryName: { fr: "Argentine", en: "Argentina" } },
  CO: { currency: "COP", currencySymbol: "COP$", locale: "en", countryName: { fr: "Colombie", en: "Colombia" } },
  CL: { currency: "CLP", currencySymbol: "CLP$", locale: "en", countryName: { fr: "Chili", en: "Chile" } },
  PE: { currency: "PEN", currencySymbol: "S/", locale: "en", countryName: { fr: "Pérou", en: "Peru" } },
  HT: { currency: "HTG", currencySymbol: "G", locale: "fr", countryName: { fr: "Haïti", en: "Haiti" } },
  // --- Asia-Pacific ---
  JP: { currency: "JPY", currencySymbol: "¥", locale: "en", countryName: { fr: "Japon", en: "Japan" } },
  CN: { currency: "CNY", currencySymbol: "¥", locale: "en", countryName: { fr: "Chine", en: "China" } },
  KR: { currency: "KRW", currencySymbol: "₩", locale: "en", countryName: { fr: "Corée du Sud", en: "South Korea" } },
  IN: { currency: "INR", currencySymbol: "₹", locale: "en", countryName: { fr: "Inde", en: "India" } },
  AU: { currency: "AUD", currencySymbol: "A$", locale: "en", countryName: { fr: "Australie", en: "Australia" } },
  NZ: { currency: "NZD", currencySymbol: "NZ$", locale: "en", countryName: { fr: "Nouvelle-Zélande", en: "New Zealand" } },
  SG: { currency: "SGD", currencySymbol: "S$", locale: "en", countryName: { fr: "Singapour", en: "Singapore" } },
  HK: { currency: "HKD", currencySymbol: "HK$", locale: "en", countryName: { fr: "Hong Kong", en: "Hong Kong" } },
  TH: { currency: "THB", currencySymbol: "฿", locale: "en", countryName: { fr: "Thaïlande", en: "Thailand" } },
  MY: { currency: "MYR", currencySymbol: "RM", locale: "en", countryName: { fr: "Malaisie", en: "Malaysia" } },
  ID: { currency: "IDR", currencySymbol: "Rp", locale: "en", countryName: { fr: "Indonésie", en: "Indonesia" } },
  PH: { currency: "PHP", currencySymbol: "₱", locale: "en", countryName: { fr: "Philippines", en: "Philippines" } },
  VN: { currency: "VND", currencySymbol: "₫", locale: "en", countryName: { fr: "Viêt Nam", en: "Vietnam" } },
  PK: { currency: "PKR", currencySymbol: "Rs", locale: "en", countryName: { fr: "Pakistan", en: "Pakistan" } },
  BD: { currency: "BDT", currencySymbol: "৳", locale: "en", countryName: { fr: "Bangladesh", en: "Bangladesh" } },
  // --- Middle East ---
  AE: { currency: "AED", currencySymbol: "AED", locale: "en", countryName: { fr: "Émirats arabes unis", en: "UAE" } },
  SA: { currency: "SAR", currencySymbol: "SAR", locale: "en", countryName: { fr: "Arabie saoudite", en: "Saudi Arabia" } },
  QA: { currency: "QAR", currencySymbol: "QAR", locale: "en", countryName: { fr: "Qatar", en: "Qatar" } },
  KW: { currency: "KWD", currencySymbol: "KWD", locale: "en", countryName: { fr: "Koweït", en: "Kuwait" } },
  IL: { currency: "ILS", currencySymbol: "₪", locale: "en", countryName: { fr: "Israël", en: "Israel" } },
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
  return { currency: "GNF", currencySymbol: "FG" };
}

export const FALLBACK_GEO = {
  country: "Guinée",
  countryCode: "GN",
  currency: "GNF",
  currencySymbol: "FG",
  locale: "fr" as Locale,
};
