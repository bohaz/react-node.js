import React, { useState } from "react";
import Auth from "./components/Auth";
import Pets from "./components/Pets";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div>
      <h1>Aplicación de Gestión de Mascotas</h1>
      {token ? (
        <>
          <button onClick={logout}>Cerrar Sesión</button>
          <Pets token={token} />
        </>
      ) : (
        <Auth setToken={setToken} />
      )}
    </div>
  );
}

export default App;
