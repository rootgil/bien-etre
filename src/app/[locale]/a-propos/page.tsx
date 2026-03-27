import { getTranslations } from "next-intl/server";
import { motion } from "framer-motion";
import { Shield, Globe2, Heart, Leaf } from "lucide-react";
import ValuesSection from "@/components/sections/ValuesSection";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("missionText") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-16 h-16 bg-[#7C9A7E]/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-[#7C9A7E]" />
          </div>
          <h1 className="font-playfair text-5xl font-bold text-[#3D5A40] mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-[#3D5A40]/60 font-cormorant italic">{t("subtitle")}</p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-10 border border-[#E2DDD6] shadow-sm">
          <h2 className="font-playfair text-3xl font-bold text-[#3D5A40] mb-6">
            {t("mission")}
          </h2>
          <p className="text-[#3D5A40]/70 text-lg leading-relaxed">{t("missionText")}</p>
        </div>

        {/* Countries */}
        <div className="mt-10 grid grid-cols-3 gap-6 text-center">
          {[
            { flag: "🇬🇳", name: "Guinée" },
            { flag: "🇨🇮", name: "Côte d'Ivoire" },
            { flag: "🇬🇭", name: "Ghana" },
          ].map((c) => (
            <div key={c.name} className="bg-white rounded-2xl p-6 border border-[#E2DDD6]">
              <div className="text-4xl mb-2">{c.flag}</div>
              <p className="text-sm font-semibold text-[#3D5A40]">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values section (reused component) */}
      <ValuesSection />
    </div>
  );
}
