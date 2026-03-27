"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

interface FeaturedSectionProps {
  products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  const t = useTranslations("featured");
  const locale = useLocale();

  return (
    <section className="py-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3D5A40]/40 mb-3">
              Sélection du moment
            </p>
            <h2 className="font-playfair text-4xl font-bold text-[#1a2e1c] mb-2">
              {t("title")}
            </h2>
            <p className="text-[#3D5A40]/55 text-base">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/produits`}
            className="inline-flex items-center gap-2 text-[#7C9A7E] font-semibold text-sm hover:text-[#3D5A40] transition-colors duration-300 group shrink-0"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
