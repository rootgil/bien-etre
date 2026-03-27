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
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="font-playfair text-4xl font-bold text-[#3D5A40] mb-2">
              {t("title")}
            </h2>
            <p className="text-[#3D5A40]/60 text-lg">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/produits`}
            className="inline-flex items-center gap-2 text-[#7C9A7E] font-semibold text-sm hover:text-[#3D5A40] transition-colors group shrink-0"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
