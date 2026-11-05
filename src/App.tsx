import { Routes, Route, useParams } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

const ProductDetailRoute = () => {
  const { productId } = useParams();

  return <ProductDetail key={productId} />;
};

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailRoute />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </>
  );
};

export default App;
