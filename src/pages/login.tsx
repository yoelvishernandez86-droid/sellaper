import { useContext, useEffect, useState } from "react";
import { CuentaContext } from "../context/cuentaProvider";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const userContext = useContext(CuentaContext);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarioIncorrecto, setUsuarioIncorrecto] = useState<boolean>(
    () => localStorage.getItem("usuarioIncorrecto") === "true",
  );
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem(
      "usuarioIncorrecto",
      JSON.stringify(usuarioIncorrecto),
    );
  }, [usuarioIncorrecto]);
  if (userContext) {
    return (
      <div>
        <h2>Ingrese su usuario y contraseña</h2>
        <label htmlFor="user">Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="text"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <div>
          <button
            onClick={async () => {
              const inicioCorrecto = await userContext.iniciarSesion(
                usuario,
                contraseña,
              );
              setUsuarioIncorrecto(!inicioCorrecto);
              if (inicioCorrecto) {
                navigate("/");
              }
            }}
          >
            Iniciar sesión
          </button>

          {usuarioIncorrecto && <p>Usuario o contraseña incorrectos.</p>}
        </div>
        <button onClick={() => userContext.setEsVisitante(true)}>
          Continuar sin iniciar sesión
        </button>
      </div>
    );
  } else {
    <div>
      <h2>Error al iniciar sesión ... intente iniciar sesión más tarde</h2>;
      <Link to="/">Seguir sin iniciar sesión</Link>
    </div>;
  }
}

export default Login;
