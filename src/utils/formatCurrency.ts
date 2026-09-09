import { COMPANY_CONFIG } from "../config/company";

export function formatCurrency(amount: number): string {
  return `${COMPANY_CONFIG.currencySymbol} ${amount.toFixed(2)}`;
}
