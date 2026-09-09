import { useState } from "react";
import { ShoppingCart, Minus, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import type { Product } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const needsColor = product.colors.length > 0;
  const needsSize = product.sizes.length > 0;

  const handleAddToCart = () => {
    if (needsColor && !color) {
      setError("Por favor selecciona un color antes de continuar.");
      return;
    }
    if (needsSize && !size) {
      setError("Por favor selecciona una talla antes de continuar.");
      return;
    }
    setError(null);
    addItem(product, { color, size, quantity });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      {/* Galería */}
      <div>
        <div className="aspect-square rounded-xl overflow-hidden border border-navy-100 bg-navy-50">
          <img src={activeImage} alt={product.name} className="h-full w-full object-cover" />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`h-16 w-16 rounded-lg overflow-hidden border-2 ${
                  activeImage === img ? "border-brand-500" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {product.category}
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-navy-900">
          {product.name}
        </h1>
        <p className="mt-3 font-display text-2xl font-bold text-navy-900">
          {formatCurrency(product.price)}
        </p>
        <p className="mt-4 text-navy-600">{product.description}</p>

        {product.features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-navy-700">
                <CheckCircle2 size={16} className="mt-0.5 text-brand-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {needsColor && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-navy-800 mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setError(null);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    color === c
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-navy-200 text-navy-600 hover:border-navy-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {needsSize && (
          <div className="mt-5">
            <p className="text-sm font-semibold text-navy-800 mb-2">Talla</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setError(null);
                  }}
                  className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    size === s
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-navy-200 text-navy-600 hover:border-navy-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm font-semibold text-navy-800 mb-2">Cantidad</p>
          <div className="inline-flex items-center rounded-lg border border-navy-200">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-navy-600 hover:bg-navy-50"
              aria-label="Disminuir cantidad"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center text-navy-600 hover:bg-navy-50"
              aria-label="Aumentar cantidad"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        {added && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2.5 text-sm text-green-700">
            <CheckCircle2 size={16} className="shrink-0" />
            Producto agregado al carrito.
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-8 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors"
        >
          <ShoppingCart size={18} /> Agregar al carrito
        </button>

        <p className="mt-4 text-xs text-navy-400">
          * El precio no incluye delivery. El costo del delivery se determina según volumen de
          compra y destino, y será confirmado por nuestro equipo.
        </p>
      </div>
    </div>
  );
}
