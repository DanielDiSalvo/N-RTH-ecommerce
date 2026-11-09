import type { CartItem, CartAction } from "../types/cart";

export const cartReducer = (
  state: CartItem[],
  action: CartAction,
): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, selectedSize, quantity } = action.payload;

      if (
        quantity <= 0 ||
        !Number.isInteger(quantity) ||
        product.stock <= 0 ||
        !product.sizes.includes(selectedSize)
      ) {
        return state;
      }

      const existingItem = state.find(
        (item) =>
          item.product.id === product.id && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        return state.map((item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }

      return [
        ...state,
        {
          product,
          selectedSize,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    }

    case "REMOVE_ITEM": {
      const { productId, selectedSize } = action.payload;

      return state.filter(
        (item) =>
          !(
            item.product.id === productId && item.selectedSize === selectedSize
          ),
      );
    }

    case "UPDATE_QUANTITY": {
      const { productId, selectedSize, quantity } = action.payload;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return state;
      }

      return state.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock),
            }
          : item,
      );
    }

    case "CLEAR_CART":
      return [];

    case "HYDRATE_CART":
      return action.payload;
      
    default:
      return state;
  }
};
