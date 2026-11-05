import { useEffect, useReducer, type ReactNode } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { products } from "../data/products";
import { cartReducer } from "../reducers/cartReducer";
import { CartContext } from "./cartContext";

interface CartProviderProps {
  children: ReactNode;
}

interface StoredCartItem {
  productId: string;
  selectedSize: string;
  quantity: number;
}

const STORAGE_KEY = "north-cart";
const initialState: CartItem[] = [];

const initCart = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);

    if (!storedCart) return [];

    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.reduce<CartItem[]>((cart, item: unknown) => {
      if (!item || typeof item !== "object") {
        return cart;
      }

      const stored = item as Partial<StoredCartItem> & {
        product?: { id?: unknown };
      };

      // Compatible con el formato anterior del carrito.
      const productId =
        typeof stored.productId === "string"
          ? stored.productId
          : stored.product?.id;

      if (
        typeof productId !== "string" ||
        typeof stored.selectedSize !== "string" ||
        !Number.isInteger(stored.quantity) ||
        typeof stored.quantity !== "number" ||
        stored.quantity <= 0
      ) {
        return cart;
      }

      const product = products.find((product) => product.id === productId);

      if (
        !product ||
        product.stock <= 0 ||
        !product.sizes.includes(stored.selectedSize)
      ) {
        return cart;
      }

      const quantity = Math.min(stored.quantity, product.stock);

      const existingItem = cart.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === stored.selectedSize,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          product.stock,
        );
      } else {
        cart.push({
          product,
          selectedSize: stored.selectedSize,
          quantity,
        });
      }

      return cart;
    }, []);
  } catch (error) {
    console.error("Error al recuperar el carrito:", error);
    return [];
  }
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, dispatch] = useReducer(cartReducer, initialState, initCart);

  useEffect(() => {
    try {
      const storedItems: StoredCartItem[] = items.map(
        ({ product, selectedSize, quantity }) => ({
          productId: product.id,
          selectedSize,
          quantity,
        }),
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
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
