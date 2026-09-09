import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryList />

      <section className="py-16 bg-navy-50/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                Productos destacados
              </h2>
              <p className="mt-1 text-navy-500">Los más solicitados por nuestros clientes</p>
            </div>
            <Link
              to="/productos"
              className="hidden sm:inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Ver todo →
            </Link>
          </div>

          <ProductGrid featuredOnly limit={8} />

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/productos"
              className="inline-block rounded-lg border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-700"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            ¿Necesitas equipos para tu empresa?
          </h2>
          <p className="mt-3 text-navy-300 max-w-2xl mx-auto">
            Contáctanos directamente por WhatsApp y te ayudamos a elegir los equipos de protección
            adecuados para tu equipo de trabajo.
          </p>
          <Link
            to="/productos"
            className="mt-6 inline-block rounded-lg bg-brand-500 px-8 py-3.5 font-semibold text-navy-900 hover:bg-brand-400 transition-colors"
          >
            Explorar catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
