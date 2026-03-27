import { NextRequest, NextResponse } from "next/server";
import { getLocaleForCountry, getCurrencyForCountry, COUNTRY_CONFIG, FALLBACK_GEO } from "@/lib/geo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const countryCode =
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry") ??
      "";

    if (!countryCode) {
      return NextResponse.json(FALLBACK_GEO, {
        headers: {
          "Cache-Control": "public, max-age=86400",
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
