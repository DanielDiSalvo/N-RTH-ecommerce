import { readFile } from "node:fs/promises";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const credentials = JSON.parse(
  await readFile(new URL("../serviceAccountKey.json", import.meta.url), "utf8"),
);

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();

const products = [
  {
    id: "north-runner",
    name: "NØRTH Runner",
    description: "Zapatillas urbanas de alto rendimiento.",
    price: 89990,
    category: "zapatillas",
    images: ["/images/categories/zapatillas.png"],
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Negro"],
    stock: 12,
    featured: true,
  },
  {
    id: "north-essential-tee",
    name: "NØRTH Essential Tee",
    description: "Remera oversized de algodón premium.",
    price: 34990,
    category: "remeras",
    images: ["/images/categories/remeras.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    stock: 20,
    featured: true,
  },
  {
    id: "north-puffer",
    name: "NØRTH Puffer Jacket",
    description: "Campera térmica de diseño urbano.",
    price: 129990,
    category: "camperas",
    images: ["/images/categories/camperas.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    stock: 8,
    featured: true,
  },
  {
    id: "north-hoodie",
    name: "NØRTH Oversized Hoodie",
    description: "Buzo de algodón con corte oversized.",
    price: 69990,
    category: "buzos",
    images: ["/images/categories/buzos.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris oscuro"],
    stock: 15,
    featured: true,
  },
];

try {
  const batch = db.batch();

  for (const { id, ...data } of products) {
    const productRef = db.collection("products").doc(id);
    batch.set(productRef, data);
  }

  await batch.commit();

  console.log(`✅ ${products.length} productos cargados en Firestore`);
} catch (error) {
  console.error("❌ Error al cargar productos:", error);
  process.exitCode = 1;
}
