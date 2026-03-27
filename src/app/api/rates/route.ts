import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Fallback rates for when open.er-api is unavailable
// XOF/XAF are officially pegged to EUR - exact, never changes
const FALLBACK_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.15, GBP: 0.87, CHF: 0.92, CAD: 1.60,
  JPY: 184, CNY: 7.98, KRW: 1739, INR: 109, AUD: 1.67, NZD: 2.00,
  SGD: 1.48, HKD: 9.03, THB: 38, MYR: 4.61, IDR: 19500, PHP: 69, VND: 30000,
  SEK: 10.87, NOK: 11.17, DKK: 7.46, PLN: 4.27, CZK: 24.5, HUF: 388,
  RON: 5.10, TRY: 51, RUB: 94, UAH: 51,
  BRL: 6.04, MXN: 20.6, CLP: 1060, ARS: 1677, COP: 4276, PEN: 4.0,
  ZAR: 19.7, GHS: 12.7, NGN: 1597, MAD: 10.8, DZD: 153, TND: 3.38,
  EGP: 61, KES: 150, ETB: 182, TZS: 2993, UGX: 4289, RWF: 1685,
  MGA: 4784, MUR: 54, CDF: 2688, HTG: 152,
  GNF: 10131, XOF: 655.96, XAF: 655.96,
  AED: 4.24, SAR: 4.33, QAR: 4.20, KWD: 0.354, ILS: 3.61,
  PKR: 323, BDT: 142,
};

export async function GET() {
  let rates: Record<string, number> = FALLBACK_RATES;
  let source = "fallback";

  try {
    // open.er-api.com - free, no key required, ~170 currencies including GNF, XOF, XAF
    const res = await fetch(
      "https://open.er-api.com/v6/latest/EUR",
      { next: { revalidate: 21600 } } // cache 6h on the server
    );

    if (res.ok) {
      const data = await res.json();
      if (data.result === "success" && data.rates) {
        rates = data.rates;
        source = "open.er-api";
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
