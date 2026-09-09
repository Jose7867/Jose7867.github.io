import { forwardRef } from "react";
import { ShieldCheck } from "lucide-react";
import type { CartItem } from "../store/cartStore";
import type { CustomerData } from "../utils/whatsapp";
import { COMPANY_CONFIG } from "../config/company";
import { formatCurrency } from "../utils/formatCurrency";
import { getDeliveryInfo } from "../utils/delivery";

interface Props {
  orderNumber: string;
  customer: CustomerData;
  items: CartItem[];
  subtotal: number;
}

const OrderNote = forwardRef<HTMLDivElement, Props>(({ orderNumber, customer, items, subtotal }, ref) => {
  const delivery = getDeliveryInfo(subtotal);
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      ref={ref}
      style={{ width: 480, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
      className="bg-white text-navy-900"
    >
      {/* Encabezado */}
      <div className="bg-navy-900 px-8 py-7 text-white">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-navy-900">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </span>
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight leading-none">
              EPPS<span className="text-brand-400">ALTOKE</span>
            </p>
            <p className="text-[11px] text-navy-300 mt-0.5">Equipos de Protección Personal</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-300">
            Nota de pedido
          </span>
          <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-navy-900">
            {orderNumber}
          </span>
        </div>
      </div>

      <div className="px-8 py-6">
        <p className="text-xs text-navy-400 mb-5">
          {dateStr} · {timeStr}
        </p>

        {/* Datos del cliente */}
        <div className="mb-5 rounded-lg bg-navy-50 p-4 text-sm">
          <p className="mb-1.5">
            <span className="font-semibold text-navy-700">Nombre: </span>
            {customer.fullName}
          </p>
          <p className="mb-1.5">
            <span className="font-semibold text-navy-700">Teléfono: </span>
            {customer.phone}
          </p>
          <p className="mb-1.5">
            <span className="font-semibold text-navy-700">Dirección: </span>
            {customer.address}
          </p>
          <p className="mb-1.5">
            <span className="font-semibold text-navy-700">Distrito: </span>
            {customer.district}
          </p>
          {customer.reference && (
            <p>
              <span className="font-semibold text-navy-700">Referencia: </span>
              {customer.reference}
            </p>
          )}
        </div>

        {/* Productos */}
        <table className="w-full text-sm mb-5">
          <thead>
            <tr className="border-b-2 border-navy-900 text-left text-xs uppercase tracking-wide text-navy-500">
              <th className="py-2 font-semibold">Producto</th>
              <th className="py-2 font-semibold text-center">Cant.</th>
              <th className="py-2 font-semibold text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.cartItemId} className="border-b border-navy-100 align-top">
                <td className="py-2.5 pr-2">
                  <p className="font-medium text-navy-900">{item.name}</p>
                  {(item.color || item.size) && (
                    <p className="text-xs text-navy-400">
                      {[item.color, item.size].filter(Boolean).join(" / ")}
                    </p>
                  )}
                  <p className="text-xs text-navy-400">{formatCurrency(item.price)} c/u</p>
                </td>
                <td className="py-2.5 text-center">{item.quantity}</td>
                <td className="py-2.5 text-right font-semibold">
                  {formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totales */}
        <div className="space-y-1.5 text-sm border-t border-navy-100 pt-3">
          <div className="flex justify-between">
            <span className="text-navy-500">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy-500">Delivery</span>
            <span className={`font-semibold ${delivery.isFree ? "text-green-600" : ""}`}>
              {delivery.label}
            </span>
          </div>
          <div className="flex justify-between border-t border-navy-900 pt-2 mt-2 text-base">
            <span className="font-bold">Total de productos</span>
            <span className="font-display font-extrabold">{formatCurrency(subtotal)}</span>
          </div>
        </div>

        {!delivery.isFree && (
          <p className="mt-3 text-[11px] leading-relaxed text-navy-400">
            El costo final del delivery será confirmado según volumen y destino.
          </p>
        )}

        {customer.notes && (
          <div className="mt-5 rounded-lg bg-navy-50 p-3 text-xs">
            <p className="font-semibold text-navy-700 mb-1">Observaciones</p>
            <p className="text-navy-600">{customer.notes}</p>
          </div>
        )}

        {/* Pie */}
        <div className="mt-7 border-t border-dashed border-navy-200 pt-4 text-center">
          <p className="text-sm font-semibold text-navy-800">Gracias por confiar en {COMPANY_CONFIG.name}.</p>
          <p className="mt-1 text-[11px] text-navy-400">
            El precio final del delivery será confirmado según volumen y destino.
          </p>
        </div>
      </div>
    </div>
  );
});

OrderNote.displayName = "OrderNote";
export default OrderNote;
