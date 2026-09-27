import { useState, useEffect } from "react";
import { getProducts } from "../types/productos";
import type { Product } from "../types/typeOfProduct";
import { categorias } from "../types/categorias";
import ProductCard from "../components/ProductCard";
import tecnologiaImage from "../assets/tecnologiaImage.png";
import "../styles/category.css";

const Tecnologia = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState("destacados");
  const subcategoriasTecnologia = [
    { valor: "todos", nombre: "Todos" },
    { valor: "laptops", nombre: "Laptops" },
    { valor: "smartphones", nombre: "Celulares" },
    { valor: "tablets", nombre: "Tablets" },
    { valor: "mobile-accessories", nombre: "Accesorios" },
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
            categorias.tecnologia.includes(producto.category),
          ),
        );
      })
      .catch(console.error);
  }, []);

  return (
    <main className="category-page tecnologia-categoria">
      <div className="category-container">
        <section className="category-hero" aria-labelledby="tecnologia-title">
          <img
            className="category-hero__image"
            src={tecnologiaImage}
            alt=""
          />
          <div className="category-hero__content">
            <p className="category-hero__eyebrow">Tecnología</p>
            <h1 id="tecnologia-title">Conecta tu mundo</h1>
            <p className="category-hero__description">Innovación para un día a día más simple y extraordinario.</p>
          </div>
        </section>

        <div className="category-bar" role="group" aria-label="Filtrar tecnología por categoría">
          {subcategoriasTecnologia.map((subCategoria) => (
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
            <label htmlFor="ordenar-tecnologia">Ordenar por</label>
            <select
              id="ordenar-tecnologia"
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
        <section className="category-products" aria-label="Productos de tecnología">
          {productosVisibles.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Tecnologia;
