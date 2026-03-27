import { getTranslations } from "next-intl/server";
import { getFeaturedProducts } from "@/lib/products";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import ValuesSection from "@/components/sections/ValuesSection";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: locale === "fr"
      ? "Bien-être Shop — Produits naturels pour votre bien-être"
      : "Bien-être Shop — Natural Wellness Products",
    description: t("subtitle"),
  };
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection products={featuredProducts} />
      <ValuesSection />
    </>
  );
}
