import type { CartItem } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";
import { getDeliveryInfo } from "../utils/delivery";

interface Props {
  items: CartItem[];
  subtotal: number;
}

export default function OrderSummary({ items, subtotal }: Props) {
  const delivery = getDeliveryInfo(subtotal);

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5">
      <h3 className="font-display font-bold text-navy-900 mb-4">Resumen del pedido</h3>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3 text-sm">
            <img
              src={item.image}
              alt={item.name}
              className="h-12 w-12 rounded-md object-cover border border-navy-100"
            />
            <div className="flex-1">
              <p className="font-medium text-navy-900 leading-tight">{item.name}</p>
              <p className="text-xs text-navy-400">
                {[item.color, item.size].filter(Boolean).join(" / ") || "—"} · x{item.quantity}
              </p>
            </div>
            <span className="font-semibold text-navy-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-navy-100 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-navy-500">Subtotal</span>
          <span className="font-semibold text-navy-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy-500">Delivery</span>
          <span className={`font-semibold ${delivery.isFree ? "text-green-600" : "text-navy-700"}`}>
            {delivery.shortLabel}
          </span>
        </div>
        <div className="flex justify-between border-t border-navy-100 pt-2 text-base">
          <span className="font-bold text-navy-900">Total de productos</span>
          <span className="font-display font-bold text-navy-900">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {!delivery.isFree && (
        <p className="mt-3 text-xs text-navy-400">
          El costo final del delivery será confirmado por nuestro equipo según el volumen y destino
          del pedido.
        </p>
      )}
    </div>
  );
}
