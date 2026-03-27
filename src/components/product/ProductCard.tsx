"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGeo } from "@/hooks/useGeo";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("product");
  const { getPriceForProduct, loading } = useGeo();

  const name = product.name[locale];
  const shortDesc = product.shortDescription[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/${locale}/produit/${product.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-[#E2DDD6]/70 shadow-sm hover:shadow-xl hover:shadow-[#C9A84C]/8 transition-all duration-500 hover:-translate-y-1"
      >
        {/* Image — portrait ratio */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0EA]">
          <Image
            src={product.images[0] ?? "/images/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle gradient at bottom for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.featured && (
              <Badge
                className="text-white border-none text-[10px] font-semibold tracking-wide px-2.5 py-1"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #D4A96A 100%)",
                }}
              >
                ★ Top vente
              </Badge>
            )}
            {!product.stock && (
              <Badge variant="destructive" className="text-[10px]">
                Rupture
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-playfair text-lg font-semibold text-[#1a2e1c] leading-tight group-hover:text-[#3D5A40] transition-colors duration-300 mb-1.5">
            {name}
          </h3>

          <p className="text-sm text-[#3D5A40]/55 leading-relaxed mb-5 line-clamp-2">
            {shortDesc}
          </p>

          <div className="flex items-center justify-between">
            {/* Price — gold accent */}
            <div>
              {loading ? (
                <div className="h-7 w-20 bg-[#E2DDD6] rounded-lg animate-pulse" />
              ) : (
                <span
                  className="text-xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C 0%, #D4A96A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {getPriceForProduct(product.priceEUR)}
                </span>
              )}
            </div>

            {/* Stock + CTA */}
            <div className="flex items-center gap-2.5">
              {product.stock && (
                <span className="flex items-center gap-1 text-[11px] text-[#7C9A7E] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t("inStock")}
                </span>
              )}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400",
                  "bg-[#3D5A40]/8 group-hover:bg-[#3D5A40] group-hover:text-white text-[#3D5A40]"
                )}
              >
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
