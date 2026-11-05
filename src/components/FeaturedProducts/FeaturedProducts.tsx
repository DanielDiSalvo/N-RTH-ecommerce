import ProductGrid from "../ProductGrid/ProductGrid";
import { products } from "../../data/products";
import styles from "./FeaturedProducts.module.scss";

const FeaturedProducts = () => {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>SELECCIÓN NØRTH</span>
          <h2>PRODUCTOS DESTACADOS</h2>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
