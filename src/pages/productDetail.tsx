import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import carritoIcono from "../assets/carrito-de-compras.svg";
import type { Product } from "../types/typeOfProduct";
import "../styles/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Product | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function cargarProducto() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error("No se encontró el producto");
        }

        const datos: Product = await respuesta.json();
        setProducto(datos);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Ocurrió un error");
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarProducto();
    return () => controller.abort();
  }, [id]);

  if (cargando || error || !producto) {
    return (
      <main className="detalle-producto">
        <div className="detalle-producto__estado" aria-busy={cargando}>
          <p className="detalle-producto__etiqueta">Sellaper</p>
          <h1>{cargando ? "Cargando producto…" : "Producto no disponible"}</h1>
          <p role={error ? "alert" : "status"}>
            {cargando
              ? "Estamos preparando todos los detalles."
              : error || "No se encontró el producto que buscas."}
          </p>
          {!cargando && <Link to="/">Volver a la tienda</Link>}
        </div>
      </main>
    );
  }

  const estrellas = Math.max(0, Math.min(5, Math.round(producto.rating)));
  const precio = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(producto.price);

  return (
    <main className="detalle-producto">
      <div className="detalle-producto__contenedor">
        <nav className="detalle-producto__ruta" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{producto.title}</span>
        </nav>

        <article className="detalle-producto__ficha" aria-labelledby="producto-titulo">
          <div className="detalle-producto__imagen">
            <img src={producto.thumbnail} alt={producto.title} />
          </div>

          <div className="detalle-producto__informacion">
            <p className="detalle-producto__etiqueta">
              {producto.category.replaceAll("-", " ")}
            </p>
            <h1 id="producto-titulo">{producto.title}</h1>
            <div
              className="detalle-producto__valoracion"
              role="img"
              aria-label={`Valoración: ${producto.rating} de 5`}
            >
              <span className="detalle-producto__estrellas" aria-hidden="true">
                {"★".repeat(estrellas)}{"☆".repeat(5 - estrellas)}
              </span>
              <span aria-hidden="true">{producto.rating.toFixed(1)} / 5</span>
            </div>
            <p className="detalle-producto__descripcion">{producto.description}</p>

            <div className="detalle-producto__compra">
              <span className="detalle-producto__precio-etiqueta">Precio</span>
              <strong className="detalle-producto__precio">{precio}</strong>
              <button className="detalle-producto__boton" type="button">
                <img src={carritoIcono} alt="" aria-hidden="true" />
                Añadir al carrito
              </button>
            </div>
            <Link className="detalle-producto__volver" to="/">
              <span aria-hidden="true">←</span> Seguir comprando
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
};

export default ProductDetail;
