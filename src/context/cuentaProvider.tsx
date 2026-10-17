import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type UsuarioType = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

type LoginRespuesta = UsuarioType & {
  accessToken: string;
  refreshToken: string;
};

type CuentaProviderType = {
  usuario: UsuarioType | null;
  esVisitante: boolean;
  cargando: boolean;
  iniciarSesion: (user: string, password: string) => Promise<boolean>;
  setEsVisitante: (valor: boolean) => void;
  cerrarSesion: () => void;
};

type CuentaProviderProps = {
  children: ReactNode;
};

export const CuentaContext = createContext<CuentaProviderType | null>(null);

export const CuentaProvider = ({ children }: CuentaProviderProps) => {
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);

  const [esVisitante, setEsVisitante] = useState<boolean>(
    () => localStorage.getItem("esVisitante") === "true",
  );

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    localStorage.setItem("esVisitante", JSON.stringify(esVisitante));
  }, [esVisitante]);

  useEffect(() => {
    const controller = new AbortController();

    const comprobarSesion = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const respuesta = await fetch("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        if (respuesta.status === 401 || respuesta.status === 403) {
          localStorage.removeItem("accessToken");
          setUsuario(null);
          return;
        }

        if (!respuesta.ok) {
          throw new Error("No se pudo comprobar la sesión");
        }

        const datos: UsuarioType = await respuesta.json();

        if (!controller.signal.aborted) {
          setUsuario(datos);
          setEsVisitante(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    };

    void comprobarSesion();

    return () => controller.abort();
  }, []);

  const iniciarSesion = async (
    user: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const respuesta = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password,
        }),
      });

      if (!respuesta.ok) return false;

      const datos: LoginRespuesta = await respuesta.json();

      localStorage.setItem("accessToken", datos.accessToken);

      setUsuario({
        id: datos.id,
        username: datos.username,
        email: datos.email,
        firstName: datos.firstName,
        lastName: datos.lastName,
        gender: datos.gender,
        image: datos.image,
      });

      setEsVisitante(false);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("usuario");
    localStorage.setItem("esVisitante", "false");

    setUsuario(null);
    setEsVisitante(false);
  };

  return (
    <CuentaContext.Provider
      value={{
        usuario,
        esVisitante,
        cargando,
        iniciarSesion,
        setEsVisitante,
        cerrarSesion,
      }}
    >
      {children}
    </CuentaContext.Provider>
  );
};
