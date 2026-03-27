"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const trustItems = [
    { emoji: "🇬🇳", label: "Guinée" },
    { emoji: "🇨🇮", label: "Côte d'Ivoire" },
    { emoji: "🇬🇭", label: "Ghana" },
    { emoji: "🇸🇳", label: "Sénégal" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FBF9F6]">
      {/* Soft ambient blobs */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#E8D5C4]/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C9A7E]/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#C9A84C]/6 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left - Text */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <span className="inline-flex items-center gap-2 bg-[#7C9A7E]/12 text-[#3D5A40] text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full border border-[#7C9A7E]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                {t("badge")} - Bien-être Shop
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-playfair text-5xl sm:text-6xl lg:text-[4.25rem] font-bold text-[#1a2e1c] leading-[1.1] tracking-tight mb-6"
            >
              {t("title")}
              <br />
              <span className="gold-text italic">{t("titleAccent")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-base sm:text-lg text-[#3D5A40]/65 leading-relaxed mb-10 max-w-md"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={`/${locale}/produits`}
                className="inline-flex items-center justify-center gap-2.5 bg-[#3D5A40] text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-[#2A3E2C] transition-all duration-500 shadow-lg shadow-[#3D5A40]/15 hover:shadow-[#3D5A40]/25 hover:scale-[1.02] group"
              >
                {t("cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
              <Link
                href={`/${locale}/a-propos`}
                className="inline-flex items-center justify-center gap-2 border border-[#3D5A40]/25 text-[#3D5A40] px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:border-[#7C9A7E] hover:bg-[#7C9A7E]/6 transition-all duration-500"
              >
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mt-12 pt-8 border-t border-[#3D5A40]/10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3D5A40]/40 mb-4">
                Livraison vers
              </p>
              <div className="flex flex-wrap gap-2">
                {trustItems.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 bg-[#7C9A7E]/10 text-[#3D5A40]/70 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 bg-[#C9A84C]/10 text-[#3D5A40]/70 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span>🌿</span>
                  <span>Naturel</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right - Lifestyle image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="hidden lg:block relative"
          >
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-[2.5rem] border border-[#C9A84C]/15 pointer-events-none" />

            {/* Main image */}
            <div className="relative h-[560px] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#3D5A40]/12">
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=85"
                alt="Soins naturels bien-être"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1200px) 50vw, 600px"
                priority
              />
              {/* Soft overlay to blend with page */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1c]/20 via-transparent to-transparent" />
            </div>

            {/* Floating card - naturalness */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl shadow-[#3D5A40]/10 px-5 py-4 border border-[#E2DDD6]/80"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7C9A7E]/15 flex items-center justify-center text-lg">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#3D5A40] tracking-wide">100% Naturel</p>
                  <p className="text-[11px] text-[#3D5A40]/50">Ingrédients sélectionnés</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card - trust */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="absolute -top-5 -right-6 bg-white rounded-2xl shadow-xl shadow-[#3D5A40]/10 px-5 py-4 border border-[#E2DDD6]/80"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-lg">
                  ✨
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#3D5A40] tracking-wide">Qualité Premium</p>
                  <p className="text-[11px] text-[#3D5A40]/50">Résultats visibles</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
