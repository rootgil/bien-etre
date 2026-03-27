import { getTranslations } from "next-intl/server";
import { getAllProducts } from "@/lib/products";
import CatalogClient from "./CatalogClient";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function CatalogPage() {
  const products = getAllProducts();
  return <CatalogClient products={products} />;
}
