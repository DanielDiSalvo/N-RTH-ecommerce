import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { useProductsContext } from "../../hooks/useProductsContext";
import type { Product } from "../../types/product";

import styles from "./ProductDetail.module.scss";

interface ProductContentProps {
  product: Product;
}

const ProductContent = ({ product }: ProductContentProps) => {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(product.price);

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize || product.stock <= 0) return;

    addItem(product, selectedSize, quantity);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>

            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`${styles.thumbnail} ${
                      selectedImage === index ? styles.active : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    aria-pressed={selectedImage === index}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - vista ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.details}>
            <span className={styles.category}>
              NØRTH / {product.category.toUpperCase()}
            </span>

            <h1>{product.name}</h1>

            <p className={styles.price}>{formattedPrice}</p>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.divider} />

            <div className={styles.selector}>
              <div className={styles.selectorHeading}>
                <span>Seleccionar talle</span>

                {selectedSize && (
                  <span className={styles.selected}>Talle: {selectedSize}</span>
                )}
              </div>

              <div className={styles.sizes}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.sizeActive : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selector}>
              <span className={styles.quantityLabel}>Cantidad</span>

              <div className={styles.quantity}>
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={18} />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={18} />
                </button>
              </div>

              <span className={styles.stock}>
                {product.stock > 0
                  ? `${product.stock} unidades disponibles`
                  : "Sin stock"}
              </span>
            </div>

            <button
              type="button"
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={!selectedSize || product.stock <= 0}
            >
              <ShoppingBag size={20} />
              AGREGAR AL CARRITO
            </button>

            {!selectedSize && product.stock > 0 && (
              <p className={styles.hint}>Seleccioná un talle para continuar.</p>
            )}

            <div className={styles.benefits}>
              <div>
                <Truck size={20} />
                <span>Envíos a todo el país</span>
              </div>

              <div>
                <RotateCcw size={20} />
                <span>Cambios y devoluciones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, loading, error } = useProductsContext();

  if (loading) {
    return (
      <main className={styles.notFound}>
        <p>Cargando producto...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.notFound}>
        <h1>Error al cargar el producto</h1>
        <p>No pudimos obtener la información del catálogo.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className={styles.notFound}>
        <h1>Producto no encontrado</h1>
        <p>El producto que buscás no está disponible.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  return <ProductContent key={product.id} product={product} />;
};

export default ProductDetail;
