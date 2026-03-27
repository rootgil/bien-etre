import type { ExchangeRates } from "@/types";

const RATES_CACHE_KEY = "bienetre_exchange_rates";
const RATES_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// Used when live rates haven't loaded yet — avoids showing raw EUR prices to GNF users
const FALLBACK_RATES_CLIENT: Record<string, number> = {
  GNF: 10131, XOF: 655.96, XAF: 655.96, CDF: 2688,
  USD: 1.15, GBP: 0.87, EUR: 1, CHF: 0.92, CAD: 1.60,
  NGN: 1597, GHS: 12.7, MAD: 10.8, DZD: 153, ZAR: 19.7,
  KES: 150, EGP: 61, TND: 3.38, MGA: 4784, MUR: 54,
  AED: 4.24, SAR: 4.33,
};

export async function getExchangeRates(): Promise<ExchangeRates | null> {
  if (typeof window !== "undefined") {
    const cached = getCachedRates();
    if (cached) return cached;
  }

  try {
    const res = await fetch("/api/rates", { next: { revalidate: 21600 } });
    if (!res.ok) throw new Error("Rate fetch failed");
    const data = await res.json();
    const rates: ExchangeRates = { ...data, fetchedAt: Date.now() };

    if (typeof window !== "undefined") {
      localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(rates));
    }

    return rates;
  } catch {
    return null;
  }
}

function getCachedRates(): ExchangeRates | null {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY);
    if (!raw) return null;
    const parsed: ExchangeRates = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > RATES_TTL_MS) {
      localStorage.removeItem(RATES_CACHE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function convertPrice(
  priceEUR: number,
  targetCurrency: string,
  rates: ExchangeRates | null
): number {
  if (targetCurrency === "EUR") return priceEUR;
  const liveRate = rates?.rates[targetCurrency];
  const rate = liveRate ?? FALLBACK_RATES_CLIENT[targetCurrency];
  if (!rate) return priceEUR;
  return Math.round(priceEUR * rate);
}

export function formatPrice(amount: number, currency: string, symbol: string): string {
  const rounded = Math.round(amount);

  // Currencies without decimal places
  const noDecimalCurrencies = ["GNF", "XOF", "XAF", "JPY", "KRW", "CLP", "PYG"];
  if (noDecimalCurrencies.includes(currency)) {
    return `${symbol} ${rounded.toLocaleString("fr-FR")}`;
  }

  return `${symbol} ${rounded.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
