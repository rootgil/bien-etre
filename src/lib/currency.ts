import type { ExchangeRates } from "@/types";

const RATES_CACHE_KEY = "bienetre_exchange_rates";
const RATES_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

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
  if (!rates || targetCurrency === "EUR") return priceEUR;
  const rate = rates.rates[targetCurrency];
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
