import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product, ProductsResponse } from "../types/product";
const Home = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const respuesta = await fetch("https://dummyjson.com/products");
      const datos: ProductsResponse = await respuesta.json();

      setProductos(datos.products);
    };

    getProducts();
  }, []);
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-tittle">
          Todo lo que te gusta <span>en un solo lugar</span>
        </h1>
        <p className="hero-description">
          Tecgnología, moda y lifestyle para tu día a día
        </p>
        <Link className="Explore-button" to="/productos">
          Inicio
        </Link>
        <article className="card1">
          <img src="" alt="" />
          <h4>Envío rápido</h4>
          <p>Desde 2-3 días</p>
        </article>
        <article className="card2">
          <img src="" alt="" />
          <h4>Compra segura</h4>
          <p>Tus datos protegidos</p>
        </article>
        <article className="card3">
          <img src="" alt="" />
          <h4>Devoluciones</h4>
          <p>En 30 días</p>
        </article>
      </div>
      <div className="categories-cards">
        <h2 className="our-categories">Nuestras categorías</h2>
        <article>
          <h3>Tecnología</h3>
          <p>Descubre lo último en electrónica</p>
          <Link to={"/tecnologia"}></Link>
        </article>
        <article>
          <h3>Ropa</h3>
          <p>Estilo para cada momento</p>
          <Link to={"/ropa"}></Link>
        </article>
        <article>
          <h3>Lifestyle</h3>
          <p>Productos que inspiran tu día</p>
          <Link to={"/lifestyle"}></Link>
        </article>
      </div>
    </div>
  );
};

export default Home;
