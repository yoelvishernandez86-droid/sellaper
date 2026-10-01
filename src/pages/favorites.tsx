import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/typeOfProduct";
import carritoIcono from "../assets/carrito-de-compras.svg";
import mascotaFavoritos from "../assets/Mascota azul pregunta por los favoritos.png";
import flechaIcono from "../assets/flecha-pequena-derecha.svg";
import { Link } from "react-router-dom";
import "../styles/favorites.css";
function Favorites() {
  const [favoritosId, setFavoritosID] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("favoritos") ?? "[]");
    } catch {
      return [];
    }
  });

  const [favoritos, setFavoritos] = useState<Product[]>([]);

  const cambiarFavoritos = (id: number) => {
    setFavoritosID((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((favoritoId) => favoritoId !== id)
        : [...anteriores, id],
    );
  };

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritosId));
  }, [favoritosId]);

  useEffect(() => {
    const getFavoritos = async () => {
      try {
        const respuesta = await fetch("https://dummyjson.com/products?limit=0");

        if (!respuesta.ok) {
          throw new Error("Error al cargar los favoritos");
        }

        const datos = await respuesta.json();

        const productosFavoritos = datos.products.filter((producto: Product) =>
          favoritosId.includes(producto.id),
        );

        setFavoritos(productosFavoritos);
      } catch (error) {
        console.error(error);
      }
    };

    getFavoritos();
  }, [favoritosId]);
  return favoritos.length !== 0 ? (
    <main className="favoritos">
      <div className="favoritos__contenedor">
        <header className="favoritos__cabecera">
          <span className="favoritos__emblema" aria-hidden="true">
            <span className="favoritos__corazon" />
          </span>
          <div>
            <p className="favoritos__etiqueta">Tu selección personal</p>
            <h1>Mis favoritos</h1>
            <p className="favoritos__descripcion">
              Tienes {favoritos.length} productos guardados
            </p>
          </div>
        </header>
        <div className="favoritos__lista">
          {favoritos.map((favorito) => (
            <div className="favoritos__producto" key={favorito.id}>
              <ProductCard product={favorito} />
              <div className="favoritos__acciones">
                <button className="favoritos__boton" type="button">
                  <img src={carritoIcono} alt="" aria-hidden="true" />
                  Añadir al carrito
                </button>
                <button
                  className="favoritos__guardar"
                  type="button"
                  onClick={() => cambiarFavoritos(favorito.id)}
                  aria-pressed={favoritosId.includes(favorito.id)}
                >
                  <span className="favoritos__corazon" aria-hidden="true" />
                  Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link className="favoritos__volver" to="/">
          <img src={flechaIcono} alt="" aria-hidden="true" />
          Volver atrás
        </Link>
      </div>
    </main>
  ) : (
    <main className="favoritos">
      <div className="favoritos__contenedor">
        <header className="favoritos__cabecera">
          <span className="favoritos__emblema" aria-hidden="true">
            <span className="favoritos__corazon" />
          </span>
          <div>
            <p className="favoritos__etiqueta">Tu selección personal</p>
            <h1>Mis favoritos</h1>
            <p className="favoritos__descripcion">
              Todo lo que te gusta, en un mismo lugar.
            </p>
          </div>
        </header>
        <section className="favoritos__vacio" aria-labelledby="favoritos-vacios">
          <div className="favoritos__ilustracion">
            <img
              className="favoritos__mascota"
              src={mascotaFavoritos}
              alt="Mascota azul de Sellaper buscando tus favoritos"
              width="1185"
              height="1327"
            />
          </div>
          <div className="favoritos__mensaje">
            <p className="favoritos__etiqueta">Aquí empieza tu colección</p>
            <h2 id="favoritos-vacios">Aún no tienes favoritos</h2>
            <p className="favoritos__descripcion">
              ¡Visita la tienda y no dudes en añadir tus productos preferidos!
              Los guardaremos aquí para cuando quieras volver.
            </p>
            <Link
              className="favoritos__boton favoritos__explorar"
              to={"/productos"}
            >
              Ver productos
              <img src={flechaIcono} alt="" aria-hidden="true" />
            </Link>
            <p className="favoritos__consejo">
              <span className="favoritos__corazon" aria-hidden="true" />
              Pulsa el corazón de un producto para guardarlo.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
