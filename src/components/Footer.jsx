
export default function Footer() {
    return (
        <footer className="bg-green-800 text-white">
            {/* Mobile */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 py-8 md:hidden">
                <div className="grid grid-cols-1 text-center gap-10">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            Vibra<span className="text-orange-400">Llano</span>
                        </h3>
                        <p className="text-green-200">
                            Apoyando el corazón comercial de Villavicencio.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-orange-400">Navegación</h4>
                        <ul className="space-y-2 text-green-200">
                            <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
                            <li><a href="#marketplace" className="hover:text-white">Marketplace</a></li>
                            <li><a href="#formalizacion" className="hover:text-white">Formalízate</a></li>
                            <li><a href="#convocatorias" className="hover:text-white">Convocatorias</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-orange-400">Legal</h4>
                        <ul className="space-y-2 text-green-200">
                            <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
                            <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="font-bold mb-4 text-orange-400">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-green-200 hover:text-white">
                                <img src="https://img.icons8.com/?size=50&id=118468&format=png" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-green-200 hover:text-white">
                                <img src="https://img.icons8.com/?size=50&id=32292&format=png" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-green-200 hover:text-white">
                                <img src="https://img.icons8.com/?size=50&id=ikThuZ5WmSYz&format=png" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-green-700 pt-6 text-center text-sm text-green-300">
                    <p>
                        &copy; 2024 VibraLlano Todos los derechos reservados
                    </p>
                </div>
            </div>
            {/* Desktop */}
            <div className="container mx-auto px-6 py-12 hidden md:block">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            Impulso<span className="text-orange-400">Llanero</span>
                        </h3>
                        <p className="text-green-200 flex flex-wrap">
                            Apoyando el corazón comercial de Villavicencio.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-orange-400">Navegación</h4>
                        <ul className="space-y-2 text-green-200">
                            <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
                            <li><a href="#marketplace" className="hover:text-white">Marketplace</a></li>
                            <li><a href="#formalizacion" className="hover:text-white">Formalízate</a></li>
                            <li><a href="#convocatorias" className="hover:text-white">Convocatorias</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-orange-400">Legal</h4>
                        <ul className="space-y-2 text-green-200">
                            <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
                            <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-orange-400">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-green-200 hover:text-white">
                                <img src="https://img.icons8.com/?size=50&id=118468&format=png" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-green-200 hover:text-white">
                                <img src="https://img.icons8.com/?size=50&id=32292&format=png" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-green-200 hover:text-white">
                                <img src="https://img.icons8.com/?size=50&id=ikThuZ5WmSYz&format=png" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-green-700 pt-6 text-center text-sm text-green-300">
                    <p>
                        &copy; 2024 VibraLlano Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
}
