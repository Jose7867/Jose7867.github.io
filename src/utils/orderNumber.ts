const ORDER_COUNTER_KEY = "eppsaltoke_order_counter";

/**
 * Devuelve el próximo número de pedido con formato PED-000001,
 * incrementando el contador guardado en localStorage.
 * No consume el número hasta que se llama explícitamente (ver getNextOrderNumber).
 */
export function peekNextOrderNumber(): string {
  const current = getCounter();
  return formatOrderNumber(current + 1);
}

export function getNextOrderNumber(): string {
  const next = getCounter() + 1;
  localStorage.setItem(ORDER_COUNTER_KEY, String(next));
  return formatOrderNumber(next);
}

function getCounter(): number {
  const stored = localStorage.getItem(ORDER_COUNTER_KEY);
  const parsed = stored ? parseInt(stored, 10) : 0;
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatOrderNumber(n: number): string {
  return `PED-${String(n).padStart(6, "0")}`;
}
