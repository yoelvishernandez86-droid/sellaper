import { useContext } from "react";
import { CarritoContext } from "../context/carritoProvider";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/typeOfProduct";
function Carrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error("CarritoContext debe usarse dentro de CarritoProvider");
  }

  if (contexto.cantidadCarrito !== 0) {
    return (
      <div>
        <div>
          <h2>Tu carrito</h2>
          <p>Revisa tus productos antes de finalizar la compra.</p>
        </div>
        <section>
          {contexto.carrito.map((articulo) => (
            <article>
              {articulo.thumbnail}
              <h3>{articulo.title}</h3>
              <p>{articulo.category}</p>
              <h3>{articulo.price}</h3>
              <div className="cantidad-selector">
                <button onClick={() => contexto.disminuirCantidad(producto.id)}>
                  −
                </button>

                <span>{producto.cantidad}</span>

                <button onClick={() => contexto.aumentarCantidad(producto.id)}>
                  +
                </button>
              </div>
            </article>
          ))}
        </section>
        <div></div>
      </div>
    );
  }

  return (
    <div>
      <h2>Tu carrito está vacío</h2>
      <p>Aún no has añadido ningún producto.</p>
    </div>
  );
}

export default Carrito;
