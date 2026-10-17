import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./context/carritoProvider.tsx";
import { CuentaProvider } from "./context/cuentaProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <CuentaProvider>
          <App />
        </CuentaProvider>
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>,
);
