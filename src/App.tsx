import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/producto/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
      <Cart />
      <WhatsAppButton />
    </div>
  );
}

export default App;
