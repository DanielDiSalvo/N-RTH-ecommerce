import { Link, useParams } from "react-router";
import { categories } from "../../data/categories";
import { useProductsContext } from "../../hooks/useProductsContext";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import styles from "./CategoryPage.module.scss";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, loading, error } = useProductsContext();

  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <main className={styles.notFound}>
        <h1>Categoría no encontrada</h1>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.category === category.id,
  );

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{category.name.toUpperCase()}</h1>

      {loading && <p className={styles.message}>Cargando productos...</p>}

      {error && (
        <p className={styles.message} role="alert">
          No pudimos cargar los productos. Intentá nuevamente.
        </p>
      )}

      {!loading && !error && (
        <>
          <p className={styles.productCount}>
            {filteredProducts.length} productos
          </p>

          <ProductGrid products={filteredProducts} />
        </>
      )}
    </main>
  );
};

export default CategoryPage;
