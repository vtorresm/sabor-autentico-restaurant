import React from 'react';
import { ChefHat, Clock, Truck, Award, Heart, Users } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: ChefHat,
      title: 'Chef Experimentado',
      description: 'Más de 15 años de experiencia en cocina internacional',
      color: 'bg-orange-500'
    },
    {
      icon: Clock,
      title: 'Servicio Rápido',
      description: 'Delivery en 30 minutos o tu pedido es gratis',
      color: 'bg-red-500'
    },
    {
      icon: Truck,
      title: 'Delivery Gratis',
      description: 'Envío gratuito en pedidos mayores a $25',
      color: 'bg-amber-500'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Ingredientes frescos y de la mejor calidad',
      color: 'bg-green-500'
    },
    {
      icon: Heart,
      title: 'Hecho con Amor',
      description: 'Cada plato preparado con pasión y dedicación',
      color: 'bg-pink-500'
    },
    {
      icon: Users,
      title: 'Ambiente Familiar',
      description: 'Perfecto para reuniones familiares y celebraciones',
      color: 'bg-blue-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Sabor Auténtico?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nos dedicamos a brindar una experiencia gastronómica excepcional con 
            el mejor servicio y los sabores más auténticos de la región.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;