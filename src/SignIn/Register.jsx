import { useState } from "react";
import api from "../axios/axios";

async function fetchSignUp(personData, userData) {
  if (
    userData.email === "" ||
    userData.password === "" ||
    userData.rolUserId === ""
  ) {
    alert("Por favor, complete todos los campos de datos de usuario.");
    return;
  }
  const resPerson = await api.post("/people", personData);
  const personId = resPerson.data.cc;

  const resUser = await api.post("/auth/sign-up", {
    ...userData,
    rolUserId: Number(userData.rolUserId),
    peopleId: personId,
  });
  return resUser;
}

export default function RegisterModal({
  open = false,
  onClose,
  onSwitchToLogin,
}) {
  const [step, setStep] = useState(1);
  const [personData, setPersonData] = useState({
    cc: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    rolUserId: "", 
  });

  const handlePersonChange = (e) => {
    const { name, value } = e.target;
    setPersonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (
      personData.cc === "" ||
      personData.firstName === "" ||
      personData.lastName === "" ||
      personData.phone === ""
    ) {
      alert("Por favor, complete todos los campos de datos personales.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchSignUp(personData, userData);
      onSwitchToLogin();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al registrar la cuenta");
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
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={[
          "relative w-full max-w-lg m-4 rounded-2xl bg-white p-8 shadow-2xl",
          "transform transition-all duration-300",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
      >
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          {step === 1 ? "Datos Personales" : "Datos de Usuario"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="number"
                name="cc"
                placeholder="Cédula"
                value={personData.cc}
                onChange={handlePersonChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={personData.firstName}
                onChange={handlePersonChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={personData.lastName}
                onChange={handlePersonChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={personData.phone}
                onChange={handlePersonChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-green-700 text-white font-bold py-3 rounded-full hover:bg-green-800"
              >
                Siguiente
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={userData.email}
                onChange={handleUserChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={userData.password}
                onChange={handleUserChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />

              <div className="flex gap-4">
                <label className="flex-1 border p-4 rounded-lg text-center cursor-pointer">
                  <input
                    type="radio"
                    name="rolUserId"
                    value="1"
                    checked={userData.rolUserId === "1"}
                    onChange={handleUserChange}
                    className="sr-only"
                  />
                  <span className="block font-semibold">Soy Comprador</span>
                </label>
                <label className="flex-1 border p-4 rounded-lg text-center cursor-pointer">
                  <input
                    type="radio"
                    name="rolUserId"
                    value="2"
                    checked={userData.rolUserId === "2"}
                    onChange={handleUserChange}
                    className="sr-only"
                  />
                  <span className="block font-semibold">Soy Vendedor</span>
                </label>
                <label className="flex-1 border p-4 rounded-lg text-center cursor-pointer">
                  <input
                    type="radio"
                    name="rolUserId"
                    value="4"
                    checked={userData.rolUserId === "4"}
                    onChange={handleUserChange}
                    className="sr-only"
                  />
                  <span className="block font-semibold">Trabajador Alcaldía</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white font-bold py-3 rounded-full hover:bg-green-800"
              >
                Crear Cuenta
              </button>
            </>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-orange-500 hover:underline"
          >
            Inicia Sesión
          </button>
        </p>
      </div>
    </div>
  );
}
