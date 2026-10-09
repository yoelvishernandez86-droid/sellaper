import { useContext, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/carritoProvider";
import flechaIcono from "../assets/flecha-pequena-derecha.svg";
import escudoIcono from "../assets/verificacion-de-escudo.svg";
import "../styles/checkout.css";

const formatoPrecio = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

function Checkout() {
  const contexto = useContext(CarritoContext);
  const [metodoPago, setMetodoPago] = useState<"tarjeta" | "paypal">("tarjeta");
  const navigate = useNavigate();

  function finalizarCompra(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/checkout/finalizado");
  }

  if (!contexto) {
    throw new Error("CarritoContext debe usarse dentro de CarritoProvider");
  }
  const { carrito, cantidadCarrito } = contexto;
  const total = carrito.reduce(
    (importe, producto) => importe + producto.price * (producto.cantidad ?? 1),
    0,
  );

  return (
    <main className="checkout">
      <div className="checkout__contenedor">
        <Link className="checkout__volver" to="/carrito">
          <img src={flechaIcono} alt="" aria-hidden="true" />
          Volver al carrito
        </Link>

        <header className="checkout__cabecera">
          <span className="checkout__emblema" aria-hidden="true">
            <img src={escudoIcono} alt="" />
          </span>
          <div>
            <p className="checkout__etiqueta">El último paso</p>
            <h1>Finalizar compra</h1>
            <p className="checkout__descripcion">
              Ya casi tienes tu pedido. Completa tus datos para terminar.
            </p>
          </div>
          <span className="checkout__demostracion">Compra de demostración</span>
        </header>

        <form className="checkout__contenido" onSubmit={finalizarCompra}>
          <div className="checkout__formulario">
            <section
              className="checkout__tarjeta"
              aria-labelledby="checkout-contacto"
            >
              <h2 id="checkout-contacto" className="checkout__titulo-paso">
                <span aria-hidden="true">1</span>Datos de contacto
              </h2>
              <div className="checkout__campo">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  aria-describedby="checkout-email-ayuda"
                  required
                />
                <p id="checkout-email-ayuda" className="checkout__ayuda">
                  Utiliza un correo de ejemplo para esta demostración.
                </p>
              </div>
            </section>

            <section
              className="checkout__tarjeta"
              aria-labelledby="checkout-envio"
            >
              <h2 id="checkout-envio" className="checkout__titulo-paso">
                <span aria-hidden="true">2</span>Dirección de envío
              </h2>
              <div className="checkout__campos">
                <div className="checkout__campo">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="given-name"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="checkout__campo">
                  <label htmlFor="lastname">Apellidos</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    autoComplete="family-name"
                    placeholder="Apellidos"
                    required
                  />
                </div>
                <div className="checkout__campo checkout__campo--completo">
                  <label htmlFor="address">Dirección</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    placeholder="Calle, número, piso, etc."
                    required
                  />
                </div>
                <div className="checkout__campo">
                  <label htmlFor="postalcode">Código postal</label>
                  <input
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    autoComplete="postal-code"
                    placeholder="28001"
                    required
                  />
                </div>
                <div className="checkout__campo">
                  <label htmlFor="city">Ciudad</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    placeholder="Madrid"
                    required
                  />
                </div>
                <div className="checkout__campo checkout__campo--completo">
                  <label htmlFor="country">País</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    placeholder="España"
                    required
                  />
                </div>
              </div>
            </section>

            <section
              className="checkout__tarjeta"
              aria-labelledby="checkout-pago"
            >
              <h2 id="checkout-pago" className="checkout__titulo-paso">
                <span aria-hidden="true">3</span>Método de pago
              </h2>

              <div
                className="checkout__metodos-pago"
                role="group"
                aria-labelledby="checkout-pago"
              >
                <label
                  className={`checkout__opcion-pago ${metodoPago === "tarjeta" ? "checkout__opcion-pago--seleccionada" : ""}`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={metodoPago === "tarjeta"}
                    onChange={() => setMetodoPago("tarjeta")}
                    required
                  />
                  <span>
                    <strong>Tarjeta</strong>
                    <span>Crédito o débito</span>
                  </span>
                </label>

                <label
                  className={`checkout__opcion-pago ${metodoPago === "paypal" ? "checkout__opcion-pago--seleccionada" : ""}`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    value="paypal"
                    checked={metodoPago === "paypal"}
                    onChange={() => setMetodoPago("paypal")}
                    required
                  />
                  <span>
                    <strong>PayPal</strong>
                    <span>Tu cuenta PayPal</span>
                  </span>
                </label>
              </div>

              {metodoPago === "tarjeta" ? (
                <div className="checkout__campos">
                  <div className="checkout__campo checkout__campo--completo">
                    <label htmlFor="card-number">Número de tarjeta</label>
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="checkout__campo">
                    <label htmlFor="expire-date">Caducidad</label>
                    <input
                      type="text"
                      id="expire-date"
                      name="expire-date"
                      inputMode="numeric"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div className="checkout__campo">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      inputMode="numeric"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="checkout__paypal">
                  <strong>Has elegido PayPal</strong>
                  <p>
                    Pulsa «Finalizar compra» para completar tu pedido de
                    demostración.
                  </p>
                </div>
              )}
              <p className="checkout__ayuda checkout__ayuda--pago">
                Este pago es simulado. Puedes utilizar datos de ejemplo.
              </p>
            </section>
          </div>

          <aside
            className="checkout__resumen"
            aria-labelledby="checkout-resumen"
          >
            <p className="checkout__etiqueta">Tu selección</p>
            <h2 id="checkout-resumen">Resumen del pedido</h2>
            <div className="checkout__productos">
              {carrito.length > 0 ? (
                carrito.map((producto) => {
                  const cantidad = producto.cantidad ?? 1;

                  return (
                    <article className="checkout__producto" key={producto.id}>
                      <div className="checkout__imagen-producto">
                        <img src={producto.thumbnail} alt={producto.title} />
                      </div>
                      <div className="checkout__detalle-producto">
                        <h3>{producto.title}</h3>
                        <p>Cantidad: {cantidad}</p>
                        <strong>
                          {formatoPrecio.format(producto.price * cantidad)}
                        </strong>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="checkout__vacio">
                  Tu carrito está vacío. <Link to="/">Explorar productos</Link>
                </p>
              )}
            </div>

            <dl className="checkout__totales">
              <div>
                <dt>Productos</dt>
                <dd>{cantidadCarrito}</dd>
              </div>
              <div className="checkout__total">
                <dt>Total de productos</dt>
                <dd>{formatoPrecio.format(total)}</dd>
              </div>
            </dl>

            <button
              className="checkout__boton"
              type="submit"
              disabled={carrito.length === 0}
            >
              Finalizar compra
              <img src={flechaIcono} alt="" aria-hidden="true" />
            </button>
            <p className="checkout__nota">
              <img src={escudoIcono} alt="" aria-hidden="true" />
              Compra de demostración. No se realizará ningún cargo.
            </p>
            <Link className="checkout__editar" to="/carrito">
              Editar mi carrito
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
