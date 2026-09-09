import { COMPANY_CONFIG } from "../config/company";
import type { CartItem } from "../store/cartStore";
import { formatCurrency } from "./formatCurrency";
import { getDeliveryInfo } from "./delivery";

export interface CustomerData {
  fullName: string;
  phone: string;
  district: string;
  address: string;
  reference: string;
  notes: string;
}

export function buildOrderMessage(
  orderNumber: string,
  customer: CustomerData,
  items: CartItem[],
  subtotal: number
): string {
  const delivery = getDeliveryInfo(subtotal);

  const productLines = items
    .map((item) => {
      const variantParts: string[] = [];
      if (item.color) variantParts.push(`Color: ${item.color}`);
      if (item.size) variantParts.push(`Talla: ${item.size}`);
      const variantText = variantParts.length ? `\n  ${variantParts.join("\n  ")}` : "";
      return `• ${item.quantity} x ${item.name}${variantText}\n  Precio: ${formatCurrency(
        item.price
      )}\n  Subtotal: ${formatCurrency(item.price * item.quantity)}`;
    })
    .join("\n\n");

  const lines = [
    `Hola ${COMPANY_CONFIG.name}, quiero realizar el siguiente pedido:`,
    "",
    `🧾 PEDIDO N.º ${orderNumber}`,
    "",
    `👤 Cliente:`,
    customer.fullName,
    "",
    `📱 Teléfono:`,
    customer.phone,
    "",
    `📍 Dirección:`,
    customer.address,
    "",
    `🏙️ Distrito:`,
    customer.district,
  ];

  if (customer.reference) {
    lines.push("", `🧭 Referencia:`, customer.reference);
  }

  lines.push("", `🛒 PRODUCTOS:`, "", productLines, "", `💰 SUBTOTAL: ${formatCurrency(subtotal)}`, "", `🚚 DELIVERY:`, delivery.label, "");

  if (delivery.isFree) {
    lines.push(`💵 TOTAL: ${formatCurrency(subtotal)}`);
  } else {
    lines.push(`💵 TOTAL DE PRODUCTOS: ${formatCurrency(subtotal)}`, "", "El delivery será coordinado según volumen y destino.");
  }

  if (customer.notes) {
    lines.push("", `📝 Observaciones:`, customer.notes);
  }

  lines.push("", "Adjunto la imagen de mi nota de pedido.", "", "Gracias.");

  return lines.join("\n");
}

export function buildGeneralInquiryMessage(): string {
  return `Hola ${COMPANY_CONFIG.name}, quisiera información sobre sus equipos de seguridad.`;
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(getWhatsAppUrl(message), "_blank");
}
