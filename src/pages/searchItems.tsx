import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../types/typeOfProduct";
import ProductCard from "../components/ProductCard";
import carritoIcono from "../assets/carrito-de-compras.svg";
import detectiveAzul from "../assets/Detective azul tras las huellas.png";
import "../styles/searchItems.css";
type ProductsResponse = {
  products: Product[];
};

const SearchItems = () => {
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("q") ?? "";

  const [objetosEncontrados, setObjetosEncontrados] = useState<Product[]>([]);
  const [cargando, setCargando] = useState(Boolean(busqueda.trim()));
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const texto = busqueda.trim();

    if (!texto) {
      setObjetosEncontrados([]);
      setError("");
      setCargando(false);
      return;
    }

    async function buscarProductos() {
      setCargando(true);
      setError("");
      setObjetosEncontrados([]);

      try {
        const respuesta = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(texto)}&limit=0`,
          { signal: controller.signal },
        );

        if (!respuesta.ok) {
          throw new Error("Fallo al contactar con la API");
        }

        const datos: ProductsResponse = await respuesta.json();

        if (!controller.signal.aborted) {
          setObjetosEncontrados(datos.products);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron buscar los productos",
        );
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    buscarProductos();

    return () => controller.abort();
  }, [busqueda]);

  return (
    <div className="buscador">
      <div className="buscador__contenedor">
        <header className="buscador__cabecera">
          <span className="buscador__emblema" aria-hidden="true" />
          <h2 className="buscador__titulo">
            Resultados para <span>"{busqueda}"</span>
          </h2>
        </header>

        {cargando ? (
          <p className="buscador__estado">Buscando productos...</p>
        ) : error ? (
          <p className="buscador__estado buscador__estado--error">{error}</p>
        ) : (
          <>
            <p className="buscador__contador">
              {objetosEncontrados.length} productos encontrados
            </p>

            {objetosEncontrados.length === 0 ? (
              <section
                className="buscador__vacio"
                aria-labelledby="buscador-sin-resultados"
              >
                <img
                  className="buscador__detective"
                  src={detectiveAzul}
                  alt="Mascota azul de Sellaper vestida de detective siguiendo huellas con una lupa"
                  width="1254"
                  height="1254"
                />
                <div className="buscador__mensaje">
                  <h3 id="buscador-sin-resultados">No encontramos productos</h3>
                  <p>
                    Prueba con otras palabras o revisa la ortografía de tu
                    búsqueda.
                  </p>
                </div>
              </section>
            ) : (
              <div className="buscador__lista">
                {objetosEncontrados.map((producto) => (
                  <article className="buscador__producto" key={producto.id}>
                    <ProductCard product={producto} />
                    <button className="buscador__boton" type="button">
                      <img src={carritoIcono} alt="" aria-hidden="true" />
                      Añadir al carrito
                    </button>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchItems;
