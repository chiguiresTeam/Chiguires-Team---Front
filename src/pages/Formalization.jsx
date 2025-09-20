
export default function Formalization() {
  return (
    <section id="formalizacion" className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Tu Camino hacia la Formalización
          </h2>
          <p className="text-gray-600 mb-3 max-w-3xl mx-auto">
            Te guiamos paso a paso para que tu negocio cumpla con todos los requisitos legales. Es más fácil de lo que crees. ¡Empecemos!
          </p>
        </div>
      <section className="flex items-center bg-green-50">
        <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl"> 

          <div className="flex flex-col gap-6 pb-6 mb-6">
            <div className="flex flex-col items-center justify-center text-center py-6">
              <div className="w-16 h-16 bg-orange-500 text-white text-3xl font-bold flex items-center justify-center rounded-full mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Autodiagnóstico Inicial
              </h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Responde unas preguntas sencillas para identificar tu estado actual y los documentos que ya tienes.
              </p>
              <a
                href="/formalization-wizard"
                className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition text-lg"
              >
                Comenzar Diagnóstico
              </a>
            </div>
          </div>
        </div>
    </section>

              
      </div>
    </section>
  );
}
