"use client";

import { useState, useEffect, useCallback } from "react";
import type { GeoData, ExchangeRates } from "@/types";
import { FALLBACK_GEO } from "@/lib/geo";
import { convertPrice, formatPrice } from "@/lib/currency";

const GEO_CACHE_KEY = "bienetre_geo";
const GEO_TTL_MS = 24 * 60 * 60 * 1000; // 24h

interface CachedGeo extends GeoData {
  fetchedAt: number;
}

function getCachedGeo(): GeoData | null {
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedGeo = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > GEO_TTL_MS) {
      localStorage.removeItem(GEO_CACHE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useGeo() {
  const [geo, setGeo] = useState<GeoData>(FALLBACK_GEO);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        // Load geo
        let geoData: GeoData;
        // In dev, if a country override changed, bust the geo cache
        const devCountryOverride =
          process.env.NODE_ENV !== "production"
            ? localStorage.getItem("bienetre_dev_country") ?? ""
            : "";
        // Also bust the cache if it's locked on the FR fallback in dev
        const cached = getCachedGeo();
        if (process.env.NODE_ENV !== "production" && cached?.countryCode === "FR" && !devCountryOverride) {
          localStorage.removeItem(GEO_CACHE_KEY);
        }
        const freshCached = getCachedGeo();
        const cacheMatchesDev =
          !devCountryOverride || (freshCached?.countryCode === devCountryOverride);
        if (freshCached && cacheMatchesDev) {
          geoData = freshCached;
        } else {
          const url = devCountryOverride ? `/api/geo?country=${devCountryOverride}` : "/api/geo";
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error("Geo failed");
          geoData = await res.json();
          // Don't cache the EUR fallback in dev — it would lock the wrong currency
          const isFallback = geoData.countryCode === "FR" && !devCountryOverride;
          if (!isFallback) {
            localStorage.setItem(
              GEO_CACHE_KEY,
              JSON.stringify({ ...geoData, fetchedAt: Date.now() })
            );
          }
        }
        setGeo(geoData);

        // Load rates
        const ratesRes = await fetch("/api/rates");
        if (ratesRes.ok) {
          const ratesData = await ratesRes.json();
          setRates(ratesData);
          localStorage.setItem(
            "bienetre_exchange_rates",
            JSON.stringify({ ...ratesData, fetchedAt: Date.now() })
          );
        }
      } catch {
        setGeo(FALLBACK_GEO);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const getPriceForProduct = useCallback(
    (priceEUR: number): string => {
      const converted = convertPrice(priceEUR, geo.currency, rates);
      return formatPrice(converted, geo.currency, geo.currencySymbol);
    },
    [geo, rates]
  );

  const getRawPrice = useCallback(
    (priceEUR: number): number => {
      return convertPrice(priceEUR, geo.currency, rates);
    },
    [geo, rates]
  );

  return { geo, rates, loading, getPriceForProduct, getRawPrice };
}
