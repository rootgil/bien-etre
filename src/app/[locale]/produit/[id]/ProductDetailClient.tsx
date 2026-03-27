"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import OrderForm from "@/components/forms/OrderForm";
import { useGeo } from "@/hooks/useGeo";
import type { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
  locale: "fr" | "en";
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("product");
  const orderT = useTranslations("orderForm");
  const { getPriceForProduct, loading } = useGeo();
  const [activeImage, setActiveImage] = useState(0);

  const name = product.name[locale];
  const description = product.description[locale];
  const benefits = product.benefits[locale];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/${locale}/produits`}
            className="inline-flex items-center gap-2 text-sm text-[#3D5A40]/60 hover:text-[#7C9A7E] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {locale === "fr" ? "Retour aux produits" : "Back to products"}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-[#E2DDD6] mb-4">
              <Image
                src={product.images[activeImage] ?? "/images/placeholder.webp"}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#C9A84C] text-white border-none">
                    ★ {locale === "fr" ? "Top vente" : "Best seller"}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-[#7C9A7E]"
                        : "border-[#E2DDD6] hover:border-[#7C9A7E]/50"
                    }`}
                  >
                    <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Stock badge */}
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#7C9A7E]" />
              <span className="text-sm font-medium text-[#7C9A7E]">
                {product.stock ? t("inStock") : t("outOfStock")}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-playfair text-4xl font-bold text-[#3D5A40] mb-4 text-balance">
              {name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              {loading ? (
                <div className="h-10 w-36 bg-[#E2DDD6] rounded-xl animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-[#3D5A40]">
                  {getPriceForProduct(product.priceEUR)}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-[#3D5A40]/70 leading-relaxed mb-6">{description}</p>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-semibold text-[#3D5A40] mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#7C9A7E]" />
                {t("benefits")}
              </h3>
              <ul className="space-y-2">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#3D5A40]/70">
                    <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="mb-8 bg-[#E2DDD6]" />

            {/* Order form */}
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#3D5A40] mb-2">
                {orderT("title")}
              </h2>
              <p className="text-sm text-[#3D5A40]/60 mb-6">{orderT("subtitle")}</p>
              <OrderForm product={product} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
