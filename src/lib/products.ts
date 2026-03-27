import productsData from "../../data/products.json";
import type { Product } from "@/types";

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.stock);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
