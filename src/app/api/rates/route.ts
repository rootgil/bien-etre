import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Currencies NOT covered by Frankfurter (West/Central African + others)
// XOF/XAF are officially pegged to EUR at a fixed rate - exact, never changes
// Others are approximate - update manually every few months
const MANUAL_RATES: Record<string, number> = {
  GNF: 9500,   // Franc guinéen
  XOF: 655.96, // Franc CFA UEMOA (peg EUR fixe officiel)
  XAF: 655.96, // Franc CFA CEMAC (peg EUR fixe officiel)
  GHS: 15.5,   // Cedi ghanéen (Frankfurter ne le couvre pas)
  NGN: 1670,   // Naira nigérian
  MAD: 10.8,   // Dirham marocain
  DZD: 145,    // Dinar algérien
};

export async function GET() {
  let rates: Record<string, number> = { EUR: 1, ...MANUAL_RATES };
  let source = "fallback";

  try {
    // Frankfurter API - free, no key, official ECB data
    // GHS, GNF, XOF, XAF not supported by Frankfurter → covered by MANUAL_RATES
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=EUR&to=USD,GBP,CHF,CAD",
      { next: { revalidate: 21600 } } // cache 6h on the server
    );

    if (res.ok) {
      const data = await res.json();
      if (data.rates) {
        rates = { EUR: 1, ...data.rates, ...MANUAL_RATES };
        source = "frankfurter";
      }
    }
  } catch {
    // Keep fallback rates
  }

  return NextResponse.json(
    { base: "EUR", rates, source },
    {
      headers: {
        "Cache-Control": "public, max-age=21600, stale-while-revalidate=3600",
      },
    }
  );
}
