
export default function Home() {
  const btnPrimary =
    "inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg";
  const formalDot =
    "w-4 h-4 rounded-full inline-block mr-2 border-2 border-white shadow-sm";

  return (
    <section id="inicio" className="pt-14">

      <div className="bg-gradient-to-tr from-[#FF7E5F] to-[#FEB47B] text-white pt-24 pb-32">
        <div className="container mx-auto px-6 text-center ">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Conecta, Compra y Crece en Villavicencio
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            La plataforma que une el comercio local. Encuentra productos únicos y apoya a los negocios de nuestra tierra.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Busca productos, servicios o negocios..."
              className="w-full py-4 px-6 rounded-full text-gray-800 shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-700 p-3 rounded-full hover:bg-green-800 transition">
              {/* <Search className="w-5 h-5 text-white" /> */}
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white py-16 -mt-16 rounded-t-3xl shadow-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Impulsando lo Nuestro en 3 Pasos
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-6 rounded-full mb-4">
                <img src="https://img.icons8.com/?size=100&id=UkLBG0sZoWV0&format=png" className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">1. Regístrate Fácil</h3>
              <p className="text-gray-600">
                Crea tu perfil como comprador o vendedor en minutos y únete a la comunidad.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-6 rounded-full mb-4">
                <img src="https://img.icons8.com/?size=50&id=4716&format=png" className="w-12 h-12 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">2. Publica tus Productos</h3>
              <p className="text-gray-600">
                Sube fotos y descripciones de lo que ofreces. ¡Mostrar tu talento nunca fue tan sencillo!
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-6 rounded-full mb-4">
                <img src="https://img.icons8.com/?size=50&id=9671&format=png" className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">3. Vende y Conecta</h3>
              <p className="text-gray-600">
                Gestiona tus ventas, contacta con tus clientes y haz crecer tu negocio localmente.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-500 font-semibold">CONFIANZA Y CRECIMIENTO</span>
            <h2 className="text-4xl font-bold text-green-800 mt-2 mb-4">
              Tu Nivel de Formalización a la Vista de Todos
            </h2>
            <p className="text-gray-600 mb-6">
              Implementamos un sistema de colores intuitivo que muestra el estado de formalización de cada negocio. Esto genera confianza en los compradores y te abre las puertas a nuevas oportunidades.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className={`${formalDot} bg-green-500`}></span>
                <strong className="text-green-600 mr-2">Verde:</strong>
                <span className="text-gray-700">Negocio 100% formalizado y en regla. ¡Máxima confianza!</span>
              </div>
              <div className="flex items-center">
                <span className={`${formalDot} bg-yellow-400`}></span>
                <strong className="text-yellow-600 mr-2">Amarillo:</strong>
                <span className="text-gray-700">En proceso de formalización. ¡Ya diste el primer paso!</span>
              </div>
              <div className="flex items-center">
                <span className={`${formalDot} bg-red-500`}></span>
                <strong className="text-red-600 mr-2">Rojo:</strong>
                <span className="text-gray-700">Negocio informal. ¡Te ayudamos a empezar el camino!</span>
              </div>
            </div>
            <a href="#formalizacion" className={`${btnPrimary} mt-8`}>Quiero formalizarme</a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <img
              src="https://placehold.co/600x400/34D399/FFFFFF?text=Negocio+Local+Exitoso"
              alt="Negocio local sonriendo"
              className="rounded-lg mb-6 w-full h-auto"
            />
            <h4 className="font-bold text-lg text-green-800">"Artesanías El Caporal"</h4>
            <div className="flex items-center mt-2">
              <span className={`${formalDot} bg-green-500`}></span>
              <span className="text-gray-700">Nivel de formalización: Completo</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              "Desde que completé mi formalización con la ayuda de la plataforma, mis ventas aumentaron un 40%. Los clientes confían más."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

