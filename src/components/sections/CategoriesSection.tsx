"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Smile, Droplets, Flower2 } from "lucide-react";

const categories = [
  {
    key: "hygiene-bucco-dentaire",
    icon: Smile,
    labelKey: "hygiene",
    gradient: "linear-gradient(135deg, #7C9A7E18 0%, #7C9A7E08 100%)",
    borderColor: "#7C9A7E30",
    iconBg: "#7C9A7E18",
    iconColor: "#3D5A40",
    description: { fr: "Sourire sain, haleine fraîche", en: "Healthy smile, fresh breath" },
  },
  {
    key: "soin-corps",
    icon: Droplets,
    labelKey: "soin",
    gradient: "linear-gradient(135deg, #C9A84C18 0%, #D4A96A08 100%)",
    borderColor: "#C9A84C30",
    iconBg: "#C9A84C18",
    iconColor: "#9A7A28",
    description: { fr: "Prenez soin de votre corps", en: "Take care of your body" },
  },
  {
    key: "beaute",
    icon: Flower2,
    labelKey: "beaute",
    gradient: "linear-gradient(135deg, #E8D5C418 0%, #E8A87C08 100%)",
    borderColor: "#E8A87C30",
    iconBg: "#E8A87C18",
    iconColor: "#9A5A30",
    description: { fr: "Beauté naturelle et radieuse", en: "Natural, radiant beauty" },
  },
];

export default function CategoriesSection() {
  const t = useTranslations("categories");
  const locale = useLocale() as "fr" | "en";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3D5A40]/40 mb-4">
            Nos univers
          </p>
          <h2 className="font-playfair text-4xl font-bold text-[#1a2e1c] mb-3">
            {t("title")}
          </h2>
          <p className="text-[#3D5A40]/55 text-base max-w-md mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/${locale}/produits?category=${cat.key}`}
                  className="group block p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: cat.gradient,
                    borderColor: cat.borderColor,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: cat.iconBg }}
                  >
                    <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: cat.iconColor }} />
                  </div>

                  {/* Text */}
                  <h3 className="font-playfair text-xl font-semibold text-[#1a2e1c] mb-2 transition-colors duration-300 group-hover:text-[#3D5A40]">
                    {t(cat.labelKey as "hygiene" | "soin" | "beaute")}
                  </h3>
                  <p className="text-sm text-[#3D5A40]/55 leading-relaxed mb-5">
                    {cat.description[locale]}
                  </p>

                  {/* Arrow */}
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    style={{ color: cat.iconColor }}
                  >
                    Découvrir
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
