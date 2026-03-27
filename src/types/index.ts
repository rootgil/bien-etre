export interface Product {
  id: string;
  slug: string;
  category: string;
  priceEUR: number;
  images: string[];
  featured: boolean;
  stock: boolean;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  shortDescription: { fr: string; en: string };
  benefits: { fr: string[]; en: string[] };
}

export interface GeoData {
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  locale: "fr" | "en";
}

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  fetchedAt: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  productId: string;
  productName: string;
  quantity: number;
  message?: string;
  currency: string;
  displayedPrice: string;
}

export type Locale = "fr" | "en";

export interface CountryConfig {
  currency: string;
  currencySymbol: string;
  locale: Locale;
  countryName: { fr: string; en: string };
}
