import { useState, useEffect } from "react";
import { getProducts } from "../types/productos";
import type { Product } from "../types/typeOfProduct";
import { categorias } from "../types/categorias";
import ProductCard from "../components/ProductCard";
import lifeStyleImage from "../assets/lifeStyleImage.png";
import "../styles/category.css";

const LifeStyle = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState("destacados");
  const subcategoriasLifestyle = [
    { valor: "todos", nombre: "Todos" },
    { valor: "home-decoration", nombre: "Decoración" },
    { valor: "furniture", nombre: "Muebles" },
    { valor: "kitchen-accessories", nombre: "Cocina" },
    { valor: "beauty", nombre: "Belleza" },
    { valor: "fragrances", nombre: "Perfumes" },
    { valor: "skin-care", nombre: "Cuidado de la piel" },
    { valor: "sports-accessories", nombre: "Deporte" },
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
            categorias.lifestyle.includes(producto.category),
          ),
        );
      })
      .catch(console.error);
  }, []);

  return (
    <main className="category-page lifeStyle-categoria">
      <div className="category-container">
        <section className="category-hero" aria-labelledby="lifestyle-title">
          <img
            className="category-hero__image"
            src={lifeStyleImage}
            alt=""
          />
          <div className="category-hero__content">
            <p className="category-hero__eyebrow">Lifestyle</p>
            <h1 id="lifestyle-title">Espacios que inspiran</h1>
            <p className="category-hero__description">Ideas y productos para una vida más bonita y consciente.</p>
          </div>
        </section>

        <div className="category-bar" role="group" aria-label="Filtrar lifestyle por categoría">
          {subcategoriasLifestyle.map((subCategoria) => (
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
            <label htmlFor="ordenar-lifestyle">Ordenar por</label>
            <select
              id="ordenar-lifestyle"
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
        <section className="category-products" aria-label="Productos de lifestyle">
          {productosVisibles.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default LifeStyle;
