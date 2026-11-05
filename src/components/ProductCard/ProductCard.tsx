import { Heart } from "lucide-react";
import { Link } from "react-router";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <Link
          to={`/product/${product.id}`}
          className={styles.productLink}
          aria-label={`Ver ${product.name}`}
        >
          <img src={product.images[0]} alt={product.name} />
        </Link>

        <button
          className={styles.favorite}
          aria-label={`Agregar ${product.name} a favoritos`}
          type="button"
        >
          <Heart size={20} />
        </button>
      </div>

      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>

        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <p>{formattedPrice}</p>
      </div>
    </article>
  );
};

export default ProductCard;
