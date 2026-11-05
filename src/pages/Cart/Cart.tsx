import { Link } from "react-router";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

import { useCart } from "../../hooks/useCart";
import styles from "./Cart.module.scss";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, subtotal } =
    useCart();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          Seguir comprando
        </Link>

        <h1>MI CARRITO</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Tu carrito está vacío.</p>
            <Link to="/">EXPLORAR PRODUCTOS</Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {items.map((item) => {
                const { product, selectedSize, quantity } = item;

                return (
                  <article
                    key={`${product.id}-${selectedSize}`}
                    className={styles.item}
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={styles.image}
                      />
                    </Link>

                    <div className={styles.itemInfo}>
                      <Link to={`/product/${product.id}`}>
                        <h2>{product.name}</h2>
                      </Link>

                      <p>Talle: {selectedSize}</p>
                      <p>{formatPrice(product.price)}</p>

                      <div className={styles.quantity}>
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          disabled={quantity <= 1}
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              selectedSize,
                              quantity - 1,
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          disabled={quantity >= product.stock}
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              selectedSize,
                              quantity + 1,
                            )
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.itemActions}>
                      <strong>{formatPrice(product.price * quantity)}</strong>

                      <button
                        type="button"
                        aria-label={`Eliminar ${product.name}, talle ${selectedSize}`}
                        onClick={() => removeItem(product.id, selectedSize)}
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </article>
                );
              })}

              <button
                type="button"
                className={styles.clearCart}
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </div>

            <aside className={styles.summary}>
              <h2>RESUMEN DE COMPRA</h2>

              <div className={styles.summaryRow}>
                <span>Productos ({totalItems})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>A calcular</span>
              </div>

              <div className={styles.total}>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <button type="button" className={styles.checkout} disabled>
                FINALIZAR COMPRA
              </button>

              <p>Próximamente: checkout seguro.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
