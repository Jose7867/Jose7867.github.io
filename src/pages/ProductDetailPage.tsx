import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { PRODUCTS } from "../data/products";
import ProductDetail from "../components/ProductDetail";
import ProductGrid from "../components/ProductGrid";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-900">Producto no encontrado</h1>
        <p className="mt-2 text-navy-500">El producto que buscas no existe o fue removido.</p>
        <Link to="/productos" className="mt-6 inline-block text-brand-600 font-semibold">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/productos"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-800"
      >
        <ChevronLeft size={16} /> Volver al catálogo
      </Link>

      <ProductDetail product={product} />

      <div className="mt-16">
        <h2 className="font-display text-xl font-bold text-navy-900 mb-6">
          Más productos de {product.category}
        </h2>
        <ProductGrid />
      </div>
    </div>
  );
}
