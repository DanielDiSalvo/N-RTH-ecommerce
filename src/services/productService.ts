
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Product[];
};
