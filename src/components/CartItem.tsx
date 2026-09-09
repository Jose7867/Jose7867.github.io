import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../store/cartStore";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-3 border-b border-navy-100 py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover border border-navy-100"
      />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-navy-900 leading-snug">{item.name}</h4>
          <button
            onClick={() => removeItem(item.cartItemId)}
            className="text-navy-400 hover:text-red-500 shrink-0"
            aria-label="Eliminar producto"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {(item.color || item.size) && (
          <p className="mt-0.5 text-xs text-navy-500">
            {item.color && <span>Color: {item.color}</span>}
            {item.color && item.size && <span> · </span>}
            {item.size && <span>Talla: {item.size}</span>}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center rounded-md border border-navy-200">
            <button
              onClick={() => decrementItem(item.cartItemId)}
              className="flex h-7 w-7 items-center justify-center text-navy-600 hover:bg-navy-50"
              aria-label="Disminuir"
            >
              <Minus size={13} />
            </button>
            <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => incrementItem(item.cartItemId)}
              className="flex h-7 w-7 items-center justify-center text-navy-600 hover:bg-navy-50"
              aria-label="Aumentar"
            >
              <Plus size={13} />
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-navy-400">{formatCurrency(item.price)} c/u</p>
            <p className="text-sm font-bold text-navy-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
