import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return { title: t("title"), description: t("intro") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  const sections = [
    { title: t("section1Title"), text: t("section1Text") },
    { title: t("section2Title"), text: t("section2Text") },
    { title: t("section3Title"), text: t("section3Text") },
    { title: t("section4Title"), text: t("section4Text") },
    { title: t("section5Title"), text: t("section5Text") },
    { title: t("section6Title"), text: t("section6Text") },
    { title: t("section7Title"), text: t("section7Text") },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-16 h-16 bg-[#7C9A7E]/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-[#7C9A7E]" />
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#3D5A40] mb-4">
            {t("title")}
          </h1>
          <p className="text-sm text-[#3D5A40]/40">{t("lastUpdated")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-3xl p-8 border border-[#E2DDD6] shadow-sm">
          <p className="text-[#3D5A40]/70 text-base leading-relaxed">{t("intro")}</p>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-8 border border-[#E2DDD6] shadow-sm"
          >
            <h2 className="font-playfair text-xl font-bold text-[#3D5A40] mb-3">
              {section.title}
            </h2>
            <p className="text-[#3D5A40]/70 text-base leading-relaxed">{section.text}</p>
          </div>
        ))}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href={`/${locale}/contact`}
            className="flex-1 text-center bg-[#3D5A40] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#7C9A7E] transition-colors"
          >
            {t("contactLink")}
          </Link>
          <Link
            href={`/${locale}`}
            className="flex-1 text-center border border-[#3D5A40]/20 text-[#3D5A40] font-semibold text-sm px-6 py-3 rounded-full hover:border-[#7C9A7E] hover:text-[#7C9A7E] transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
