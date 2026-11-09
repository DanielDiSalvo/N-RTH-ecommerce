import { useEffect, useReducer, type ReactNode } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { cartReducer } from "../reducers/cartReducer";
import { CartContext } from "./cartContext";
import { useProductsContext } from "../hooks/useProductsContext";

interface CartProviderProps {
  children: ReactNode;
}

interface ReadyCartProviderProps extends CartProviderProps {
  products: Product[];
}

interface StoredCartItem {
  productId: string;
  selectedSize: string;
  quantity: number;
}

const STORAGE_KEY = "north-cart";

const initCart = (products: Product[]): CartItem[] => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);

    if (!storedCart) return [];

    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.reduce<CartItem[]>((cart, item: unknown) => {
      if (!item || typeof item !== "object") return cart;

      const stored = item as Partial<StoredCartItem> & {
        product?: { id?: unknown };
      };

      const productId =
        typeof stored.productId === "string"
          ? stored.productId
          : stored.product?.id;

      if (
        typeof productId !== "string" ||
        typeof stored.selectedSize !== "string" ||
        typeof stored.quantity !== "number" ||
        !Number.isInteger(stored.quantity) ||
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

      const existing = cart.find(
        (item) =>
          item.product.id === productId &&
          item.selectedSize === stored.selectedSize,
      );

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
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

const ReadyCartProvider = ({ children, products }: ReadyCartProviderProps) => {
  const [items, dispatch] = useReducer(cartReducer, products, initCart);

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

const CartProvider = ({ children }: CartProviderProps) => {
  const { products, loading, error } = useProductsContext();

  if (loading) {
    return <p>Cargando catálogo...</p>;
  }

  if (error) {
    return <p>Error al cargar el catálogo: {error}</p>;
  }

  return <ReadyCartProvider products={products}>{children}</ReadyCartProvider>;
};

export default CartProvider;
