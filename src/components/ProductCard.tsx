import type { Product } from "../types/typeOfProduct";
import carritoIcono from "../assets/carrito-de-compras.svg";
import "../styles/productCard.css";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const estrellas = Math.round(product.rating);
  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-card__details">
        <h3 className="product-card__title">{product.title}</h3>
        <div
          className="product-card__rating"
          role="img"
          aria-label={`Valoración: ${product.rating} de 5`}
        >
          <span className="product-card__stars" aria-hidden="true">
            {"★".repeat(estrellas)}
            {"☆".repeat(5 - estrellas)}
          </span>
          <span className="product-card__rating-value">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <p className="product-card__price">{product.price} €</p>
        <button className="product-card__button" type="button">
          <img src={carritoIcono} alt="" aria-hidden="true" />
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
