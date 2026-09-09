import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const hasVariants = product.colors.length > 0 || product.sizes.length > 0;

  const handleQuickAdd = () => {
    if (hasVariants) return; // se maneja desde el detalle si requiere variantes
    addItem(product, { color: null, size: null, quantity: 1 });
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white hover:shadow-lg transition-shadow">
      <Link to={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-navy-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-navy-900">
            Destacado
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">
          {product.category}
        </span>
        <Link to={`/producto/${product.slug}`}>
          <h3 className="mt-1 font-display font-semibold text-navy-900 line-clamp-2">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-navy-500 line-clamp-2">{product.description}</p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-display font-bold text-lg text-navy-900">
            {formatCurrency(product.price)}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            to={`/producto/${product.slug}`}
            className="flex-1 rounded-lg border border-navy-200 px-3 py-2 text-center text-sm font-medium text-navy-700 hover:bg-navy-50 transition-colors"
          >
            Ver producto
          </Link>
          <button
            onClick={handleQuickAdd}
            disabled={hasVariants}
            title={hasVariants ? "Selecciona color/talla en el detalle" : "Agregar al carrito"}
            className="flex items-center justify-center rounded-lg bg-navy-900 px-3 py-2 text-white hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
