import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../types/typeOfProduct";
import ProductCard from "../components/ProductCard";
import heroImage from "../assets/chicaUsandoSellaperBanner.png";
import technologyImage from "../assets/imagenParaTecnologiaCategoria.png";
import clothingImage from "../assets/imagenParaRopaCategoria.png";
import lifestyleImage from "../assets/imagenParaLifeStyle.png";
import collectionImage from "../assets/bannerInferior.png";
import deliveryIcon from "../assets/coche-trasero.svg";
import shieldIcon from "../assets/verificacion-de-escudo.svg";
import boxIcon from "../assets/caja-abierta.svg";
import arrowIcon from "../assets/flecha-pequena-derecha.svg";
import "../styles/home.css";
import { getProducts } from "../types/productos";
const Home = () => {
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosSellaper = await getProducts();
        setProductos(productosSellaper);
      } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <main className="home">
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src={heroImage}
          alt=""
          fetchPriority="high"
        />
        <div className="home-container hero-inner">
          <div className="hero-content">
            <h1 className="hero-title" id="hero-title">
              Todo lo que te gusta,<span>en un solo lugar.</span>
            </h1>
            <p className="hero-description">
              Tecnología, moda y lifestyle para tu día a día.
            </p>
            <Link className="home-button explore-button" to="/todasCategorias">
              Explorar productos
              <img src={arrowIcon} alt="" aria-hidden="true" />
            </Link>
            <div className="hero-benefits">
              <article className="hero-benefit">
                <img src={deliveryIcon} alt="" aria-hidden="true" />
                <div>
                  <h3>Envío rápido</h3>
                  <p>Desde 2-3 días</p>
                </div>
              </article>
              <article className="hero-benefit">
                <img src={shieldIcon} alt="" aria-hidden="true" />
                <div>
                  <h3>Compra segura</h3>
                  <p>Tus datos protegidos</p>
                </div>
              </article>
              <article className="hero-benefit">
                <img src={boxIcon} alt="" aria-hidden="true" />
                <div>
                  <h3>Devoluciones</h3>
                  <p>En 30 días</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div className="home-container home-catalog">
        <section className="categories" aria-labelledby="categories-title">
          <div className="section-heading">
            <h2 id="categories-title">Nuestras categorías</h2>
            <Link className="section-link" to="/todasCategorias">
              Ver todas <img src={arrowIcon} alt="" aria-hidden="true" />
            </Link>
          </div>
          <div className="categories-grid">
            <article className="category-card category-technology">
              <Link className="category-link" to="/tecnologia">
                <div className="category-image">
                  <img src={technologyImage} alt="" />
                </div>
                <div className="category-content">
                  <h3>Tecnología</h3>
                  <p>
                    Descubre lo último
                    <br />
                    en electrónica
                  </p>
                  <span className="category-arrow" aria-hidden="true">
                    <img src={arrowIcon} alt="" />
                  </span>
                </div>
              </Link>
            </article>
            <article className="category-card category-clothing">
              <Link className="category-link" to="/ropa">
                <div className="category-image">
                  <img src={clothingImage} alt="" />
                </div>
                <div className="category-content">
                  <h3>Ropa</h3>
                  <p>
                    Estilo para cada
                    <br />
                    momento
                  </p>
                  <span className="category-arrow" aria-hidden="true">
                    <img src={arrowIcon} alt="" />
                  </span>
                </div>
              </Link>
            </article>
            <article className="category-card category-lifestyle">
              <Link className="category-link" to="/lifestyle">
                <div className="category-image">
                  <img src={lifestyleImage} alt="" />
                </div>
                <div className="category-content">
                  <h3>Lifestyle</h3>
                  <p>
                    Productos que
                    <br />
                    inspiran tu día
                  </p>
                  <span className="category-arrow" aria-hidden="true">
                    <img src={arrowIcon} alt="" />
                  </span>
                </div>
              </Link>
            </article>
          </div>
        </section>

        <section className="relevant-products" aria-labelledby="products-title">
          <div className="section-heading">
            <h2 id="products-title">Productos destacados</h2>
            <Link className="section-link" to="/todasCategorias">
              Ver más productos{" "}
              <img src={arrowIcon} alt="" aria-hidden="true" />
            </Link>
          </div>
          <div className="products-grid">
            {productos.slice(0, 6).map((producto) => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        </section>
      </div>

      <section className="banner-inferior" aria-labelledby="collection-title">
        <img
          className="collection-image"
          src={collectionImage}
          alt=""
          loading="lazy"
        />
        <div className="collection-content">
          <h2 id="collection-title">
            Tu estilo,
            <br />
            sin límites.
          </h2>
          <p>Moda y accesorios para cada plan.</p>
          <Link className="home-button collection-button" to="/ropa">
            Descubrir colección
            <img src={arrowIcon} alt="" aria-hidden="true" />
          </Link>
        </div>
        <p className="collection-note" aria-hidden="true">
          Vive
          <br />
          tu propio
          <br />
          estilo
        </p>
      </section>
    </main>
  );
};

export default Home;
