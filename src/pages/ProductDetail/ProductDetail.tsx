import { Link, useParams } from "react-router";
import { products } from "../../data/products";

const ProductDetail = () => {
  const { productId } = useParams();

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main>
        <h1>Producto no encontrado</h1>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "64px 24px" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        {product.price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          maximumFractionDigits: 0,
        })}
      </p>
      <img src={product.images[0]} alt={product.name} width="300" />
    </main>
  );
};

export default ProductDetail;
