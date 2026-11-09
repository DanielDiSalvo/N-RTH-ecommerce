import { createContext } from "react";
import type { Product } from "../types/product";

export interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const ProductsContext =
  createContext<ProductsContextType | undefined>(undefined);
