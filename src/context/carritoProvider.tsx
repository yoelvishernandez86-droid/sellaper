import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";

import type { Product } from "../types/typeOfProduct";

type CarritoContextType = {
  carrito: Product[];
  cantidadCarrito: number;
  añadirAlCarrito: (nuevoItem: Product) => void;
  aumentarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
};

type CarritoProviderProps = {
  children: ReactNode;
};

export const CarritoContext = createContext<CarritoContextType | null>(null);

export function CarritoProvider({ children }: CarritoProviderProps) {
  const [carrito, setCarrito] = useState<Product[]>(
    localStorage.getItem("carrito")
      ? JSON.parse(localStorage.getItem("carrito")!)
      : [],
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + (item.cantidad ?? 1),
    0,
  );

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  const aumentarCantidad = (id: number) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id ? { ...item, cantidad: (item.cantidad ?? 1) + 1 } : item,
      ),
    );
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const disminuirCantidad = (id: number) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, (item.cantidad ?? 1) - 1) }
          : item,
      ),
    );
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

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
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cantidadCarrito,
        añadirAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
