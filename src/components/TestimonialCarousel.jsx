import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import panaderia from "../assets/pasteleria.jpg";
import tienda from "../assets/tienda.jpg";
import artesanias from "../assets/artesanias.jpg";

const testimonials = [
  {
    name: "Artesanías El Caporal",
    text: "Desde que completé mi formalización con la ayuda de la plataforma, mis ventas aumentaron un 40%.",
    image: artesanias,
    level: "Completo",
  },
  {
    name: "Panadería Doña Marta",
    text: "Ahora confían más en mi negocio y pude acceder a créditos formales.",
    image: panaderia,
    level: "En proceso",
  },
  {
    name: "Tienda Los Andes",
    text: "Gracias a la formalización, participé en ferias y aumenté mis clientes.",
    image: tienda,
    level: "Completo",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
          Historias de Éxito
        </h2>
        <Swiper spaceBetween={30} slidesPerView={1} loop={true} autoplay={{ delay: 5000 }}>
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl mx-auto text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="rounded-xl mb-6 w-full h-64 object-cover"
                />
                <h4 className="font-bold text-xl text-green-800">{t.name}</h4>
                <p className="text-gray-600 mt-4 italic">"{t.text}"</p>
                <span className="block mt-4 text-sm text-green-600">
                  Nivel de formalización: {t.level}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
