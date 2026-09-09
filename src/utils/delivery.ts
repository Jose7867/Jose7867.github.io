import { COMPANY_CONFIG } from "../config/company";

export interface DeliveryInfo {
  isFree: boolean;
  label: string;
  shortLabel: string;
}

/**
 * Calcula la información de delivery según el subtotal.
 * Nunca suma un monto fijo al total: si no es gratis, el costo se coordina con el vendedor.
 */
export function getDeliveryInfo(subtotal: number): DeliveryInfo {
  if (subtotal >= COMPANY_CONFIG.freeDeliveryMinimum) {
    return {
      isFree: true,
      label: "GRATIS",
      shortLabel: "GRATIS",
    };
  }

  return {
    isFree: false,
    label: `Por coordinar — desde ${COMPANY_CONFIG.currencySymbol} ${COMPANY_CONFIG.minimumDeliveryPrice.toFixed(2)}`,
    shortLabel: `Desde ${COMPANY_CONFIG.currencySymbol} ${COMPANY_CONFIG.minimumDeliveryPrice.toFixed(2)} — Por coordinar`,
  };
}
