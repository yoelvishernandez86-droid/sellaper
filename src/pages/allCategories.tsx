import { useState, useEffect } from "react";
import type { Product } from "../types/typeOfProduct";
import { getProducts } from "../types/productos";
import { categorias } from "../types/categorias";
import ProductCard from "../components/ProductCard";
import cajaIcono from "../assets/caja-abierta.svg";
import "../styles/allCategories.css";

const categoriasEsp: string[] = [
  "Portátiles",
  "Móviles",
  "Tablets",
  "Accesorios móviles",
  "Camisas de hombre",
  "Calzado de hombre",
  "Vestidos",
  "Calzado de mujer",
  "Tops",
  "Relojes de hombre",
  "Relojes de mujer",
  "Gafas de sol",
  "Bolsos",
  "Joyería",
  "Belleza",
  "Perfumes",
  "Cuidado de la piel",
  "Muebles",
  "Decoración del hogar",
  "Accesorios de cocina",
  "Accesorios deportivos",
];

const categoriasIngles: string[] = Object.values(categorias).flat();

const opcionesCategorias = categoriasIngles.map((valor, indice) => ({
  valor,
  nombre: categoriasEsp[indice] ?? valor,
}));

function AllCategories() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState("destacados");

  useEffect(() => {
    getProducts()
      .then((todos) => {
        setProductos(
          todos.filter((producto) =>
            categoriasIngles.includes(producto.category),
          ),
        );
      })
      .catch(console.error);
  }, []);

  const productosVisibles = productos
    .filter(
      (producto) =>
        categoriaSeleccionada === "todos" ||
        producto.category === categoriaSeleccionada,
    )
    .sort((a, b) => {
      if (orden === "valoracion") return b.rating - a.rating;
      if (orden === "precio-asc") return a.price - b.price;
      if (orden === "precio-desc") return b.price - a.price;
      return 0;
    });

  return (
    <main className="catalogo">
      <div className="catalogo__contenedor">
        <header className="catalogo__cabecera">
          <span className="catalogo__emblema" aria-hidden="true">
            <img src={cajaIcono} alt="" />
          </span>
          <div>
            <p className="catalogo__etiqueta">Explora Sellaper</p>
            <h1>Todos los productos</h1>
            <p className="catalogo__descripcion">
              Todo lo que buscas, en un solo lugar.
            </p>
          </div>
        </header>

        <div className="catalogo__contenido">
          <aside
            className="catalogo__filtros"
            aria-labelledby="catalogo-categorias"
          >
            <h2 id="catalogo-categorias">Categorías</h2>
            <p className="catalogo__ayuda">Encuentra lo que te gusta</p>
            <div
              className="catalogo__categorias"
              role="group"
              aria-label="Filtrar productos por categoría"
            >
              <button
                className="catalogo__categoria"
                type="button"
                onClick={() => setCategoriaSeleccionada("todos")}
                aria-pressed={categoriaSeleccionada === "todos"}
              >
                Todas las categorías
              </button>

              {opcionesCategorias.map(({ valor, nombre }) => (
                <button
                  className="catalogo__categoria"
                  key={valor}
                  type="button"
                  onClick={() => setCategoriaSeleccionada(valor)}
                  aria-pressed={categoriaSeleccionada === valor}
                >
                  {nombre}
                </button>
              ))}
            </div>
          </aside>

          <div className="catalogo__resultados">
            <div className="catalogo__barra">
              <p
                className="catalogo__contador"
                aria-live="polite"
                aria-atomic="true"
              >
                <strong>{productosVisibles.length}</strong>{" "}
                {productosVisibles.length === 1 ? "producto" : "productos"}
              </p>
              <div className="catalogo__orden">
                <label htmlFor="ordenar-catalogo">Ordenar por</label>
                <select
                  id="ordenar-catalogo"
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                >
                  <option value="destacados">Destacados</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="valoracion">Mejor valorados</option>
                </select>
              </div>
            </div>

            <section
              className="catalogo__productos"
              aria-label="Productos disponibles"
            >
              {productosVisibles.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AllCategories;
