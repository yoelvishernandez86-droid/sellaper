import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Tecnologia from "./pages/tecnologia";
import Ropa from "./pages/ropa";
import LifeStyle from "./pages/lifeStyle";
function App() {
  const { pathname } = useLocation();

  return (
    <div className={pathname === "/" ? "App App--home" : "App"}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/ropa" element={<Ropa />} />
        <Route path="/lifestyle" element={<LifeStyle />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
