import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Tecnologia from "./pages/tecnologia";
import Ropa from "./pages/ropa";
import LifeStyle from "./pages/lifeStyle";
import ProductDetail from "./pages/productDetail";
import Favorites from "./pages/favorites";
import SearchItems from "./pages/searchItems";
import Carrito from "./pages/carrito";
import AllCategories from "./pages/allCategories";
import Checkout from "./pages/checkout";
import CheckoutFinalizado from "./pages/checkoutFinalizado";
import Login from "./pages/login";
import Cuenta from "./pages/cuenta";
import { useContext } from "react";
import { CuentaContext } from "./context/cuentaProvider";

function App() {
  const { pathname } = useLocation();
  const userContext = useContext(CuentaContext);

  if (!userContext) {
    throw new Error("App debe estar dentro de CuentaProvider");
  }

  if (userContext.cargando) {
    return <p>Cargando...</p>;
  }

  if (!userContext.usuario && !userContext.esVisitante) {
    return <Login />;
  }

  return (
    <div className={pathname === "/" ? "App App--home" : "App"}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/ropa" element={<Ropa />} />
        <Route path="/lifestyle" element={<LifeStyle />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/buscar" element={<SearchItems />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/todasCategorias" element={<AllCategories />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/finalizado" element={<CheckoutFinalizado />} />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route path="/iniciar-sesion" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
