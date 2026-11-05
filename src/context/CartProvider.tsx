import { useReducer, type ReactNode } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { cartReducer } from "../reducers/cartReducer";
import { CartContext } from "./cartContext";

interface CartProviderProps {
  children: ReactNode;
}

const initialState: CartItem[] = [];

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, dispatch] = useReducer(cartReducer, initialState);

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
