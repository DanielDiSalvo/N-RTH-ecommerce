import ProductGrid from "../ProductGrid/ProductGrid";
import { useProductsContext } from "../../hooks/useProductsContext";
import styles from "./FeaturedProducts.module.scss";

const FeaturedProducts = () => {
  const { products, loading, error } = useProductsContext();

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>SELECCIÓN NØRTH</span>
          <h2>PRODUCTOS DESTACADOS</h2>
        </div>

        {loading && <p>Cargando productos...</p>}

        {error && (
          <p role="alert">
            No pudimos cargar los productos. Intentá nuevamente.
          </p>
        )}

        {!loading && !error && <ProductGrid products={featuredProducts} />}
      </div>
    </section>
  );
};

export default FeaturedProducts;
