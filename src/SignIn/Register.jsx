
export default function RegisterModal({ open = false, onClose, onSwitchToLogin }) {
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
          {/* <X className="w-6 h-6" /> */}
        </button>

        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Crea tu Cuenta</h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="tucorreo@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>


          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</label>
            <div className="flex gap-4">
              <label className="flex-1 border p-4 rounded-lg text-center cursor-pointer has-[:checked]:bg-orange-50 has-[:checked]:border-orange-500 transition">
                <input type="radio" name="account_type" value="buyer" className="sr-only" />
                {/* <User className="mx-auto w-8 h-8 text-gray-500" /> */}
                <span className="block mt-2 font-semibold">Soy Comprador</span>
              </label>

              <label className="flex-1 border p-4 rounded-lg text-center cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-green-500 transition">
                <input type="radio" name="account_type" value="seller" className="sr-only" />
                {/* <Store className="mx-auto w-8 h-8 text-gray-500" /> */}
                <span className="block mt-2 font-semibold">Soy Vendedor</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mt-6"
          >
            Crear Cuenta
          </button>
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
