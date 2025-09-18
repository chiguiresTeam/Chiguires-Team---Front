
export default function Login({ open = false, onClose, onSwitchToRegister }) {
  return (
    <div
      className=
      "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300"
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
          {/* <X className="w-6 h-6" /> */}
        </button>

        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Iniciar Sesión</h2>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
          ¿No tienes una cuenta?{' '}
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
