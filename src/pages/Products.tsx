import ProductGrid from "../components/ProductGrid";

export default function Products() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy-900">Catálogo de productos</h1>
        <p className="mt-2 text-navy-500">
          Equipos de protección personal certificados para tu empresa.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
