import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";
import ProductCard from "./ProductCard";

type SortOption = "relevancia" | "precio-asc" | "precio-desc";

interface Props {
  featuredOnly?: boolean;
  limit?: number;
}

export default function ProductGrid({ featuredOnly = false, limit }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("categoria") ?? "";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("relevancia");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (featuredOnly) {
      list = list.filter((p) => p.featured);
    }

    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "precio-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list.sort((a, b) => b.price - a.price);

    if (limit) list = list.slice(0, limit);

    return list;
  }, [featuredOnly, categoryFilter, search, sort, limit]);

  return (
    <div>
      {!featuredOnly && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              const value = e.target.value;
              setSearchParams(value ? { categoria: value } : {});
            }}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-navy-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-navy-200 p-12 text-center text-navy-500">
          No se encontraron productos con esos filtros.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
