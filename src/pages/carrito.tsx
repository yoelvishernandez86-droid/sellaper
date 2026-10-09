import { useContext } from "react";
import { Link } from "react-router-dom";
import carritoIcono from "../assets/carrito-de-compras.svg";
import mascotaCarrito from "../assets/Mascota azul empujando un carrito.png";
import flechaIcono from "../assets/flecha-pequena-derecha.svg";
import { CarritoContext } from "../context/carritoProvider";
import "../styles/carrito.css";

const formatoPrecio = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

function Carrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error("CarritoContext debe usarse dentro de CarritoProvider");
  }

  const { carrito, cantidadCarrito } = contexto;
  const total = carrito.reduce(
    (importe, articulo) => importe + articulo.price * (articulo.cantidad ?? 1),
    0,
  );

  return (
    <main className="carrito">
      <div className="carrito__contenedor">
        <header className="carrito__cabecera">
          <span className="carrito__emblema" aria-hidden="true">
            <img src={carritoIcono} alt="" />
          </span>
          <div>
            <p className="carrito__etiqueta">Tu próxima compra</p>
            <h1>Tu carrito</h1>
            <p className="carrito__descripcion">
              {cantidadCarrito > 0
                ? `Tienes ${cantidadCarrito} ${cantidadCarrito === 1 ? "producto listo" : "productos listos"} para llevarte.`
                : "Tus próximos favoritos te esperan en Sellaper."}
            </p>
          </div>
        </header>

        {cantidadCarrito > 0 ? (
          <div className="carrito__contenido">
            <section
              className="carrito__lista"
              aria-label="Productos del carrito"
            >
              {carrito.map((articulo) => {
                const cantidad = articulo.cantidad ?? 1;

                return (
                  <article className="carrito__producto" key={articulo.id}>
                    <Link
                      className="carrito__imagen"
                      to={`/producto/${articulo.id}`}
                      aria-label={`Ver ${articulo.title}`}
                    >
                      <img src={articulo.thumbnail} alt={articulo.title} />
                    </Link>
                    <div className="carrito__informacion">
                      <p className="carrito__categoria">
                        {articulo.category.replaceAll("-", " ")}
                      </p>
                      <h2>
                        <Link to={`/producto/${articulo.id}`}>
                          {articulo.title}
                        </Link>
                      </h2>
                      <p className="carrito__precio-unitario">
                        {formatoPrecio.format(articulo.price)} / unidad
                      </p>
                      <div className="carrito__acciones">
                        <div
                          className="carrito__cantidad"
                          role="group"
                          aria-label={`Cantidad de ${articulo.title}`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              contexto.disminuirCantidad(articulo.id)
                            }
                            disabled={cantidad <= 1}
                            aria-label={`Reducir cantidad de ${articulo.title}`}
                          >
                            -
                          </button>
                          <span aria-live="polite" aria-atomic="true">
                            {cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              contexto.aumentarCantidad(articulo.id)
                            }
                            aria-label={`Aumentar cantidad de ${articulo.title}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="carrito__eliminar"
                          type="button"
                          onClick={() =>
                            contexto.eliminarDelCarrito(articulo.id)
                          }
                          aria-label={`Eliminar ${articulo.title} del carrito`}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="carrito__importe">
                      <span>Subtotal</span>
                      <strong>
                        {formatoPrecio.format(articulo.price * cantidad)}
                      </strong>
                    </div>
                  </article>
                );
              })}
              <Link className="carrito__volver" to="/">
                <img src={flechaIcono} alt="" aria-hidden="true" />
                Seguir comprando
              </Link>
            </section>

            <aside
              className="carrito__resumen"
              aria-labelledby="carrito-resumen"
            >
              <p className="carrito__etiqueta">Todo en un mismo lugar</p>
              <h2 id="carrito-resumen">Resumen de tu carrito</h2>
              <dl className="carrito__totales">
                <div>
                  <dt>Productos</dt>
                  <dd>{cantidadCarrito}</dd>
                </div>
                <div className="carrito__total">
                  <dt>Total de productos</dt>
                  <dd>{formatoPrecio.format(total)}</dd>
                </div>
              </dl>
              <p className="carrito__nota">
                Puedes ajustar las cantidades o seguir explorando la tienda.
              </p>
              <Link className="carrito__boton" to="/">
                Ver más productos
                <img src={flechaIcono} alt="" aria-hidden="true" />
              </Link>
              <Link to={"/checkout"} className="carrito__boton">
                Proceder al pago{" "}
                <img src={flechaIcono} alt="" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        ) : (
          <section className="carrito__vacio" aria-labelledby="carrito-vacio">
            <div className="carrito__ilustracion">
              <img
                className="carrito__mascota"
                src={mascotaCarrito}
                alt="Mascota azul de Sellaper empujando un carrito vacío"
                width="1448"
                height="1086"
              />
            </div>
            <div className="carrito__mensaje">
              <p className="carrito__etiqueta">
                Vamos a llenarlo de cosas que te gustan
              </p>
              <h2 id="carrito-vacio">Aún no tienes productos en tu carrito</h2>
              <p className="carrito__descripcion">
                Descubre nuestra selección de tecnología, moda y lifestyle.
              </p>
              <Link className="carrito__boton carrito__explorar" to="/">
                Explorar productos
                <img src={flechaIcono} alt="" aria-hidden="true" />
              </Link>
              <p className="carrito__consejo">
                <img src={carritoIcono} alt="" aria-hidden="true" />
                Pulsa «Añadir al carrito» en el producto que te guste.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Carrito;
