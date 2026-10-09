import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/carritoProvider";
import mascotaDespidiendose from "../assets/mascota despidiendose.png";
import flechaDerecha from "../assets/flecha-pequena-derecha.svg";
import verificacionEscudo from "../assets/verificacion-de-escudo.svg";
import "../styles/checkoutFinalizado.css";

function CheckoutFinalizado() {
  const contexto = useContext(CarritoContext);
  const vaciarCarrito = contexto?.vaciarCarrito;

  useEffect(() => {
    vaciarCarrito?.();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [vaciarCarrito]);

  if (!contexto) {
    throw new Error("CheckoutFinalizado debe usarse dentro de CarritoProvider");
  }

  return (
    <main
      className="checkout-finalizado"
      aria-labelledby="checkout-finalizado-titulo"
    >
      <div className="checkout-finalizado__contenedor">
        <div className="checkout-finalizado__tarjeta">
          <div className="checkout-finalizado__ilustracion">
            <img
              className="checkout-finalizado__mascota"
              src={mascotaDespidiendose}
              alt="La mascota azul de Sellaper sonriendo y despidiéndose con la mano"
              width="1185"
              height="1327"
            />
          </div>

          <div className="checkout-finalizado__mensaje">
            <p className="checkout-finalizado__etiqueta">
              <img src={verificacionEscudo} alt="" aria-hidden="true" />
              Pedido completado
            </p>

            <h1 id="checkout-finalizado-titulo">
              ¡Muchas gracias por comprar en Sellaper!
            </h1>

            <p className="checkout-finalizado__descripcion">
              Tu pedido de demostración se ha completado.
            </p>

            <p className="checkout-finalizado__nota">
              Esta compra es una simulación. No se ha realizado ningún cargo a
              tu tarjeta.
            </p>

            <Link className="checkout-finalizado__boton" to="/">
              Seguir comprando
              <img src={flechaDerecha} alt="" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutFinalizado;
