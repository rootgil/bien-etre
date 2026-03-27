"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";
import { useGeo } from "@/hooks/useGeo";

interface CatalogClientProps {
  products: Product[];
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const CATEGORIES = [
  { key: "all", fr: "Toutes les catégories", en: "All categories" },
  { key: "hygiene-bucco-dentaire", fr: "Hygiène Bucco-dentaire", en: "Oral Hygiene" },
  { key: "soin-corps", fr: "Soins Corps", en: "Body Care" },
  { key: "beaute", fr: "Beauté Naturelle", en: "Natural Beauty" },
];

export default function CatalogClient({ products }: CatalogClientProps) {
  const t = useTranslations("catalog");
  const locale = useLocale() as "fr" | "en";
  const { getRawPrice } = useGeo();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => getRawPrice(a.priceEUR) - getRawPrice(b.priceEUR));
        break;
      case "price-desc":
        list.sort((a, b) => getRawPrice(b.priceEUR) - getRawPrice(a.priceEUR));
        break;
      case "name":
        list.sort((a, b) => a.name[locale].localeCompare(b.name[locale]));
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [products, category, sort, locale, getRawPrice]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-playfair text-4xl font-bold text-[#3D5A40] mb-2">
              {t("title")}
            </h1>
            <p className="text-[#3D5A40]/60 text-lg">{t("subtitle")}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#7C9A7E]" />
            <span className="text-sm font-medium text-[#3D5A40]">{t("filter")}</span>
          </div>

          <div className="flex flex-wrap gap-3 flex-1">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === cat.key
                      ? "bg-[#3D5A40] text-white"
                      : "bg-white border border-[#E2DDD6] text-[#3D5A40]/70 hover:border-[#7C9A7E] hover:text-[#7C9A7E]"
                  }`}
                >
                  {cat[locale]}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="sm:ml-auto">
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-48 border-[#E2DDD6] text-sm">
                  <SelectValue placeholder={t("sort")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t("sortFeatured")}</SelectItem>
                  <SelectItem value="price-asc">{t("sortPriceLow")}</SelectItem>
                  <SelectItem value="price-desc">{t("sortPriceHigh")}</SelectItem>
                  <SelectItem value="name">{t("sortName")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[#3D5A40]/50 mb-6">
          {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#3D5A40]/40">
            <p className="text-lg">{t("noProducts")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
