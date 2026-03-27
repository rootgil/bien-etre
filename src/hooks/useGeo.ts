"use client";

import { useState, useEffect, useCallback } from "react";
import type { GeoData, ExchangeRates } from "@/types";
import { FALLBACK_GEO } from "@/lib/geo";
import { convertPrice, formatPrice } from "@/lib/currency";

const GEO_CACHE_KEY = "bienetre_geo";
const GEO_CACHE_VERSION = 2; // increment to bust all existing caches on next deploy
const GEO_TTL_MS = 24 * 60 * 60 * 1000; // 24h

interface CachedGeo extends GeoData {
  fetchedAt: number;
  v?: number;
}

function getCachedGeo(): GeoData | null {
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedGeo = JSON.parse(raw);
    if (parsed.v !== GEO_CACHE_VERSION || Date.now() - parsed.fetchedAt > GEO_TTL_MS) {
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
        const devCountryOverride =
          process.env.NODE_ENV !== "production"
            ? localStorage.getItem("bienetre_dev_country") ?? ""
            : "";

        // In dev with an override, always fetch fresh to respect the override.
        // getCachedGeo() also busts old cache entries via the version stamp.
        const cached = devCountryOverride ? null : getCachedGeo();

        if (cached) {
          geoData = cached;
        } else {
          const url = devCountryOverride ? `/api/geo?country=${devCountryOverride}` : "/api/geo";
          // /api/geo is cached at the Vercel edge (Cache-Control: public, max-age=86400)
          // so no-store here just skips the browser cache, not the edge cache - stays fast
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error("Geo failed");
          geoData = await res.json();
          localStorage.setItem(
            GEO_CACHE_KEY,
            JSON.stringify({ ...geoData, fetchedAt: Date.now(), v: GEO_CACHE_VERSION })
          );
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
