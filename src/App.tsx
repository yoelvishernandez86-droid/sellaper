import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tegnologia" element={<Products categoria="tegnologia" />} />
      <Route path="/ropa" element={<Products categoria="ropa" />} />
      <Route path="/lifestyle" element={<Products categoria="lifestyle" />} />
      <Route path="/ofertas" element={<Products categoria="ofertas" />} />
    </Routes>
  );
}

export default App;
