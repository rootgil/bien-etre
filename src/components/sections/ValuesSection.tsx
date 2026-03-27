"use client";

import { motion } from "framer-motion";
import { Shield, Globe2, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

const values = [
  { icon: Shield, titleKey: "value1Title", textKey: "value1Text", accentColor: "#7C9A7E" },
  { icon: Globe2, titleKey: "value2Title", textKey: "value2Text", accentColor: "#C9A84C" },
  { icon: Heart, titleKey: "value3Title", textKey: "value3Text", accentColor: "#E8A87C" },
];

export default function ValuesSection() {
  const t = useTranslations("about");

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#3D5A40" }}>
      {/* Golden dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #C9A84C 1.5px, transparent 0)",
          backgroundSize: "36px 36px",
          opacity: 0.06,
        }}
      />
      {/* Soft ambient light top-right */}
      <div
        className="absolute top-0 right-0 w-[45%] h-[60%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Soft ambient light bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[35%] h-[50%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, rgba(124,154,126,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
            Ce qui nous guide
          </p>
          <h2 className="font-playfair text-4xl font-bold text-white mb-3">{t("values")}</h2>
          <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed">{t("missionText")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group text-center p-8 rounded-2xl border border-white/8 hover:border-white/16 transition-all duration-500 hover:bg-white/5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {/* Icon ring */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: val.accentColor + "22" }}
                >
                  <Icon className="w-7 h-7" style={{ color: val.accentColor }} />
                </div>

                {/* Title */}
                <h3
                  className="font-playfair text-xl font-semibold mb-3 transition-colors duration-300"
                  style={{ color: val.accentColor }}
                >
                  {t(val.titleKey as "value1Title" | "value2Title" | "value3Title")}
                </h3>

                {/* Text */}
                <p className="text-white/55 text-sm leading-relaxed">
                  {t(val.textKey as "value1Text" | "value2Text" | "value3Text")}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
