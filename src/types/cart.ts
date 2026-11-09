
import type { Product } from "./product";

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type CartAction =
  | {
      type: "HYDRATE_CART";
      payload: CartItem[];
    }
  | {
      type: "ADD_ITEM";
      payload: CartItem;
    }
  | {
      type: "REMOVE_ITEM";
      payload: {
        productId: string;
        selectedSize: string;
      };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: string;
        selectedSize: string;
        quantity: number;
      };
    }
  | {
      type: "CLEAR_CART";
    };
