import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import CartItem from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";
import { getDeliveryInfo } from "../utils/delivery";

export default function Cart() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const navigate = useNavigate();

  const delivery = getDeliveryInfo(subtotal);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-navy-900/50 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
          <h2 className="font-display text-lg font-bold text-navy-900">Tu carrito</h2>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-navy-50"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-navy-400 py-12">
              <ShoppingBag size={40} />
              <p className="font-medium">Tu carrito está vacío</p>
              <p className="text-sm">Explora nuestros productos y agrega lo que necesites.</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.cartItemId} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-navy-100 px-5 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-navy-500">Subtotal de productos</span>
              <span className="font-semibold text-navy-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-navy-500">Delivery</span>
              <span className={`font-semibold ${delivery.isFree ? "text-green-600" : "text-navy-700"}`}>
                {delivery.shortLabel}
              </span>
            </div>
            {!delivery.isFree && (
              <p className="text-xs text-navy-400">
                El costo final del delivery será confirmado por nuestro equipo según el volumen y
                destino del pedido.
              </p>
            )}
            <div className="flex justify-between border-t border-navy-100 pt-3 text-base">
              <span className="font-bold text-navy-900">Total de productos</span>
              <span className="font-display font-bold text-navy-900">{formatCurrency(subtotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-3.5 font-semibold text-navy-900 hover:bg-brand-400 transition-colors"
            >
              Continuar pedido <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
