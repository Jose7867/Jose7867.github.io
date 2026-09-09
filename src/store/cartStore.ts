import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../data/products";

export interface CartItem {
  cartItemId: string; // combinación única de producto + variantes
  productId: number;
  name: string;
  image: string;
  price: number;
  color: string | null;
  size: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, options: { color: string | null; size: string | null; quantity: number }) => void;
  removeItem: (cartItemId: string) => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

function buildCartItemId(productId: number, color: string | null, size: string | null): string {
  return `${productId}-${color ?? "nc"}-${size ?? "ns"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, { color, size, quantity }) => {
        const cartItemId = buildCartItemId(product.id, color, size);
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                cartItemId,
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                color,
                size,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (cartItemId) =>
        set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) })),

      incrementItem: (cartItemId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrementItem: (cartItemId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "eppsaltoke-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
