import { useState, useEffect } from "react";
import { getProducts } from "../types/productos";
import type { Product } from "../types/typeOfProduct";
import { categorias } from "../types/categorias";
import ProductCard from "../components/ProductCard";
import ropaImage from "../assets/ropaImage.png";
import "../styles/category.css";

const Ropa = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState("destacados");
  const subcategoriasRopa = [
    { valor: "todos", nombre: "Todos" },
    { valor: "mens-shirts", nombre: "Camisas de hombre" },
    { valor: "mens-shoes", nombre: "Zapatos de hombre" },
    { valor: "womens-dresses", nombre: "Vestidos" },
    { valor: "womens-shoes", nombre: "Zapatos de mujer" },
    { valor: "tops", nombre: "Tops" },
    { valor: "mens-watches", nombre: "Relojes de hombre" },
    { valor: "womens-watches", nombre: "Relojes de mujer" },
    { valor: "sunglasses", nombre: "Gafas de sol" },
    { valor: "womens-bags", nombre: "Bolsos" },
    { valor: "womens-jewellery", nombre: "Joyería" },
  ];

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
  useEffect(() => {
    getProducts()
      .then((todos) => {
        setProductos(
          todos.filter((producto) =>
            categorias.ropa.includes(producto.category),
          ),
        );
      })
      .catch(console.error);
  }, []);

  return (
    <main className="category-page ropa-categoria">
      <div className="category-container">
        <section className="category-hero" aria-labelledby="ropa-title">
          <img
            className="category-hero__image"
            src={ropaImage}
            alt=""
          />
          <div className="category-hero__content">
            <p className="category-hero__eyebrow">Ropa</p>
            <h1 id="ropa-title">Estilo que te acompaña</h1>
            <p className="category-hero__description">Looks para cada plan, todos los días.</p>
          </div>
        </section>

        <div className="category-bar" role="group" aria-label="Filtrar ropa por categoría">
          {subcategoriasRopa.map((subCategoria) => (
            <button
              key={subCategoria.valor}
              type="button"
              aria-pressed={categoriaSeleccionada === subCategoria.valor}
              onClick={() => setCategoriaSeleccionada(subCategoria.valor)}
            >
              {subCategoria.nombre}
            </button>
          ))}
        </div>
        <div className="category-toolbar">
          <p className="category-count" aria-live="polite">
            {productosVisibles.length} {productosVisibles.length === 1 ? "producto" : "productos"}
          </p>
          <div className="category-sort">
            <label htmlFor="ordenar-ropa">Ordenar por</label>
            <select
              id="ordenar-ropa"
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
        <section className="category-products" aria-label="Productos de ropa">
          {productosVisibles.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Ropa;
