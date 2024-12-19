import React, { useState } from "react";
import axios from "axios";

function Auth({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await axios.post(endpoint, { username, password });

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } else {
        alert("Usuario registrado, ahora puedes iniciar sesión.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || "Error en autenticación");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Iniciar Sesión" : "Registrar Usuario"}</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isLogin ? "Iniciar Sesión" : "Registrar"}
      </button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </p>
    </div>
  );
}

export default Auth;
