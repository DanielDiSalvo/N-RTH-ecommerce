import type { ReactNode } from "react";
import { ProductsContext } from "./productsContext";
import { useProducts } from "../hooks/useProducts";

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const { products, loading, error } = useProducts();

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
