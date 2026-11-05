import { Link, useParams } from "react-router";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <main style={{ padding: "80px 24px" }}>
        <h1>Categoría no encontrada</h1>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.category === category.id,
  );

  return (
    <main
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "64px 24px",
        minHeight: "70vh",
      }}
    >
      <h1>{category.name.toUpperCase()}</h1>

      <p>{filteredProducts.length} productos</p>

      <ProductGrid products={filteredProducts} />
    </main>
  );
};

export default CategoryPage;
