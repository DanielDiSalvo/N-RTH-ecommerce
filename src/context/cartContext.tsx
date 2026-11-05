import { createContext } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedSize: string, quantity: number) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (
    productId: string,
    selectedSize: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
