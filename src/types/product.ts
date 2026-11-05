export type ProductCategory =
  | "zapatillas"
  | "remeras"
  | "camperas"
  | "buzos";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
}