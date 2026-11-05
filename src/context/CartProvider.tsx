import { useEffect, useReducer, type ReactNode } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { cartReducer } from "../reducers/cartReducer";
import { CartContext } from "./cartContext";

interface CartProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "north-cart";

const initialState: CartItem[] = [];

const initCart = (initialState: CartItem[]): CartItem[] => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);

    if (!storedCart) {
      return initialState;
    }

    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return initialState;
    }

    return parsedCart.filter(
      (item): item is CartItem =>
        item !== null &&
        typeof item === "object" &&
        item.product !== null &&
        typeof item.product === "object" &&
        typeof item.product.id === "string" &&
        typeof item.product.price === "number" &&
        typeof item.product.stock === "number" &&
        Array.isArray(item.product.sizes) &&
        item.product.sizes.includes(item.selectedSize) &&
        typeof item.selectedSize === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        item.quantity <= item.product.stock,
    );
  } catch (error) {
    console.error("Error al recuperar el carrito:", error);
    return initialState;
  }
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, dispatch] = useReducer(cartReducer, initialState, initCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  }, [items]);

  const addItem = (
    product: Product,
    selectedSize: string,
    quantity: number,
  ) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, selectedSize, quantity },
    });
  };

  const removeItem = (productId: string, selectedSize: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId, selectedSize },
    });
  };

  const updateQuantity = (
    productId: string,
    selectedSize: string,
    quantity: number,
  ) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, selectedSize, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
