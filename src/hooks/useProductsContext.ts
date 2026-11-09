
import { useContext } from "react";
import { ProductsContext } from "../context/productsContext";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProductsContext debe utilizarse dentro de ProductsProvider"
    );
  }

  return context;
};
