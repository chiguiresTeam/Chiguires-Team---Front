import React from "react";
import { useState } from "react";
import { ArrowLeftCircle, CalendarClock, Tag, Target, Globe, HandPlatter } from "lucide-react";
import {useNavigate } from "react-router-dom";


export default function CallDetails() {


    const navigate = useNavigate();

    return (
        <section id="convocatoria-detalle" className="py-20 bg-gray-50 relative overflow-hidden">

            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 text-orange-100/50 z-0 pointer-events-none select-none">
                <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="currentColor"
                        d="M49.8,-57.9C62,-44.9,67.6,-26.3,69.2,-6.9C70.8,12.5,68.4,32.7,57.7,46.4C47,60.1,28.1,67.2,8.1,69.5C-11.8,71.8,-31.8,69.2,-47.4,59.3C-63,49.4,-74.2,32.2,-77.3,13.2C-80.4,-5.8,-75.4,-26.6,-63.9,-40.4C-52.4,-54.2,-34.4,-61,-17.7,-63.1C-1,-65.2,14.5,-62.7,27.1,-63.3C39.7,-63.9,49.8,-57.9,49.8,-57.9Z"
                        transform="translate(100 100)"
                    />
                </svg>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-green-100/50 z-0 pointer-events-none select-none">
                <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="currentColor"
                        d="M49.8,-57.9C62,-44.9,67.6,-26.3,69.2,-6.9C70.8,12.5,68.4,32.7,57.7,46.4C47,60.1,28.1,67.2,8.1,69.5C-11.8,71.8,-31.8,69.2,-47.4,59.3C-63,49.4,-74.2,32.2,-77.3,13.2C-80.4,-5.8,-75.4,-26.6,-63.9,-40.4C-52.4,-54.2,-34.4,-61,-17.7,-63.1C-1,-65.2,14.5,-62.7,27.1,-63.3C39.7,-63.9,49.8,-57.9,49.8,-57.9Z"
                        transform="translate(100 100) scale(1.2)"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">


                <button className="inline-flex items-center gap-2 text-gray-700 font-semibold py-2 px-4 rounded-full border border-gray-300 mb-8 hover:bg-gray-100 hover:border-gray-400 transition"
                type="button"
                onClick={() => navigate("/call")}
                >
                    <ArrowLeftCircle className="w-5 h-5 text-gray-600" />
                    Volver a todas las convocatorias
                </button>



                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Columna Principal */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl">
                        <img
                            src="https://placehold.co/800x450/34D399/FFFFFF?text=Fondo+Emprender"
                            alt="Banner de la convocatoria"
                            className="rounded-2xl w-full h-auto mb-6"
                        />

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className="inline-block bg-green-100 text-green-800 text-sm font-bold px-4 py-1.5 rounded-full">
                                Para Negocios y Empresas
                            </span>
                            <span className="inline-block bg-orange-100 text-orange-800 text-sm font-bold px-4 py-1.5 rounded-full">
                                Evento / Feria
                            </span>
                            <span className="text-sm text-gray-500">
                                Organizado por: <strong>SENA - Fondo Emprender</strong>
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-green-800 mb-4 leading-tight">
                            Capital Semilla para Emprendimientos Innovadores
                        </h1>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            El Fondo Emprender del SENA abre su convocatoria nacional para financiar iniciativas empresariales en cualquier sector económico. Se otorgan recursos no reembolsables (capital semilla) que pueden ser condonados si el emprendedor cumple con los hitos y metas establecidos en su plan de negocio.
                        </p>

                        <h3 className="text-2xl font-bold text-green-800 mb-3">¿Quiénes pueden participar?</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6 pl-2">
                            <li>Aprendices SENA que hayan finalizado la etapa lectiva.</li>
                            <li>Estudiantes universitarios que estén cursando los dos últimos semestres.</li>
                            <li>Profesionales con título de pregrado, maestría o doctorado.</li>
                            <li>Egresados del programa SENA Emprende Rural (SER).</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-green-800 mb-3">Objetivo de la Convocatoria</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Fomentar la creación de empresas innovadoras, sostenibles y que generen empleo formal en la región, contribuyendo al desarrollo económico de Villavicencio y el Meta. Se busca apoyar ideas de negocio con alto potencial de crecimiento y que respondan a necesidades del mercado local.
                        </p>
                    </div>

                    {/* Columna de Información */}
                    <div className="lg:col-span-1 sticky top-28">
                        <div className="bg-amber-50 p-8 rounded-3xl shadow-xl border border-amber-200">
                            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b border-amber-300 pb-4">
                                Información Clave
                            </h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <CalendarClock className="w-6 h-6 mt-1 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-800">Fecha Límite</h4>
                                        <p className="text-gray-700">25 de Octubre, 2024</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Tag className="w-6 h-6 mt-1 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-800">Tipo</h4>
                                        <p className="text-gray-700">Financiación (Capital Semilla)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Target className="w-6 h-6 mt-1 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-800">Dirigido a</h4>
                                        <p className="text-gray-700">Emprendedores y Nuevas Empresas</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Globe className="w-6 h-6 mt-1 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-gray-800">Modalidad</h4>
                                        <p className="text-gray-700">Virtual / Nacional</p>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center w-full mt-8 bg-orange-500 text-white font-bold text-center py-4 px-6 rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-lg text-lg"
                            >
                                <HandPlatter className="w-5 h-5 mr-2" />
                                Aplicar Ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}