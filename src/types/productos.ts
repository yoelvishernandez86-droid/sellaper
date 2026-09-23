import { categorias, subCategorias } from "./categorias";
import type { Product, ProductsResponse } from "./typeOfProduct";

export const getProducts = async (): Promise<Product[]> => {
  const respuesta = await fetch("https://dummyjson.com/products?limit=0");

  if (!respuesta.ok) {
    throw new Error("Error al acceder a la API");
  }

  const datos: ProductsResponse = await respuesta.json();

  return datos.products.filter((producto) =>
    subCategorias.includes(producto.category),
  );
};

export const productosCategoria = (
  productos: Product[],
  categoria: keyof typeof categorias,
): Product[] => {
  return productos.filter((producto) =>
    categorias[categoria].includes(producto.category),
  );
};
