import { createContext, useState, type ReactNode } from "react";

import type { Product } from "../types/typeOfProduct";

type CarritoContextType = {
  carrito: Product[];
  cantidadCarrito: number;
  añadirAlCarrito: (nuevoItem: Product) => void;
};

type CarritoProviderProps = {
  children: ReactNode;
};

export const CarritoContext = createContext<CarritoContextType | null>(null);

export function CarritoProvider({ children }: CarritoProviderProps) {
  const [carrito, setCarrito] = useState<Product[]>([]);

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + (item.cantidad ?? 1),
    0,
  );

  const añadirAlCarrito = (nuevoItem: Product) => {
    setCarrito((actual) => {
      const existe = actual.some((item) => item.id === nuevoItem.id);

      if (existe) {
        return actual.map((item) =>
          item.id === nuevoItem.id
            ? {
                ...item,
                cantidad: (item.cantidad ?? 1) + 1,
              }
            : item,
        );
      }

      return [
        ...actual,
        {
          ...nuevoItem,
          cantidad: 1,
        },
      ];
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cantidadCarrito,
        añadirAlCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
