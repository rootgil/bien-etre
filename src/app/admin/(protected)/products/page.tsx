import { AdminHeader } from "../../_components/AdminHeader";
import { getAllProducts } from "@/lib/products";
import { ProductsClient } from "./ProductsClient";

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div>
      <AdminHeader title="Gestion des produits" />
      <div className="p-6">
        <ProductsClient initialProducts={products} />
      </div>
    </div>
  );
}
