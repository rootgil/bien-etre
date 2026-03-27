import { NextRequest, NextResponse } from "next/server";
import { getLocaleForCountry, getCurrencyForCountry, COUNTRY_CONFIG, FALLBACK_GEO } from "@/lib/geo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // Allow ?country=GN override in dev for testing
    const devOverride =
      process.env.NODE_ENV !== "production"
        ? (new URL(request.url).searchParams.get("country") ?? "")
        : "";

    const countryCode =
      devOverride ||
      (request.headers.get("x-vercel-ip-country") ??
        request.headers.get("cf-ipcountry") ??
        "");

    if (!countryCode) {
      // In production with no IP header use EUR fallback; in dev default to GN for testing
      const fallback =
        process.env.NODE_ENV !== "production"
          ? { country: "Guinée", countryCode: "GN", currency: "GNF", currencySymbol: "FG", locale: "fr" as const }
          : FALLBACK_GEO;
      return NextResponse.json(fallback, {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL ?? "*",
        },
      });
    }

    const locale = getLocaleForCountry(countryCode);
    const { currency, currencySymbol } = getCurrencyForCountry(countryCode);
    const config = COUNTRY_CONFIG[countryCode];

    const country = config
      ? locale === "fr"
        ? config.countryName.fr
        : config.countryName.en
      : countryCode;

    return NextResponse.json(
      { country, countryCode, currency, currencySymbol, locale },
      {
        headers: {
          "Cache-Control": "public, max-age=86400",
          "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL ?? "*",
        },
      }
    );
  } catch {
    return NextResponse.json(FALLBACK_GEO, { status: 200 });
  }
}
