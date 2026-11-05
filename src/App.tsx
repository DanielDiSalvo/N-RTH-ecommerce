import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </>
  );
};

export default App;
