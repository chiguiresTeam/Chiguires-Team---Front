import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

async function fetchLogin(userData) {
  if (userData.email === "" || userData.password === "") {
    alert("Por favor, complete todos los campos de datos de usuario.");
    return;
  }
  const resUser = await api.post("/auth/sign-in", userData);
  return resUser;
}

export default function Login({ open = false, onClose, onSwitchToRegister }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchLogin(userData);
      if (res && res.status === 200) {
        // Puedes guardar el token en localStorage si tu API lo envía
        // localStorage.setItem("token", res.data.token);
        alert("Inicio de sesión exitoso");
        navigate("/"); // redirección a Home
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión, verifica tus credenciales");
    }
  };

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 blur-lg" onClick={onClose} />

      <div
        className={[
          "relative w-full max-w-md m-4 rounded-2xl bg-white p-8 shadow-2xl",
          "transform transition-all duration-300",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          {/* Ícono opcional */}
        </button>

        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Iniciar Sesión
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="tucorreo@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-orange-500 hover:underline"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
