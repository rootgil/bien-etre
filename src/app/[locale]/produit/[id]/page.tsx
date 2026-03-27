import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  const products = getAllProducts();
  const locales = ["fr", "en"];
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, id: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const product = getProductBySlug(id);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "product" });
  const lang = locale as "fr" | "en";

  return {
    title: product.name[lang],
    description: product.shortDescription[lang],
    openGraph: {
      title: product.name[lang],
      description: product.shortDescription[lang],
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id, locale } = await params;
  const product = getProductBySlug(id);

  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "product" });

  return <ProductDetailClient product={product} locale={locale as "fr" | "en"} />;
}
