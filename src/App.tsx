import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/productos" element={<Products />} />
        <Route
          path="/tecnologia"
          element={<Products categoria="tecnologia" />}
        />
        <Route path="/ropa" element={<Products categoria="ropa" />} />
        <Route path="/lifestyle" element={<Products categoria="lifestyle" />} />
        <Route path="/ofertas" element={<Products categoria="ofertas" />} />*/}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
