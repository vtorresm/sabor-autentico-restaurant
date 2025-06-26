import React, { useState } from 'react';
import { Star, Leaf, Wheat, Heart, Plus } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  tags: string[];
  rating: number;
}

interface MenuSectionProps {
  addToCart: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('entradas');
  const [dietFilter, setDietFilter] = useState('all');

  const categories = [
    { id: 'entradas', label: 'Entradas', icon: '🥗' },
    { id: 'principales', label: 'Platos Principales', icon: '🍽️' },
    { id: 'postres', label: 'Postres', icon: '🍰' },
    { id: 'bebidas', label: 'Bebidas', icon: '🥤' }
  ];

  const menuItems: Record<string, MenuItem[]> = {
    entradas: [
      {
        id: 'entrada-1',
        name: 'Carpaccio de Salmón',
        description: 'Finas láminas de salmón fresco con alcaparras, rúcula y vinagreta de limón',
        price: 18,
        image: 'https://images.pexels.com/photos/725199/pexels-photo-725199.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Salmón fresco', 'Rúcula', 'Alcaparras', 'Limón', 'Aceite de oliva'],
        tags: ['Sin gluten'],
        rating: 4.8
      },
      {
        id: 'entrada-2',
        name: 'Ensalada César Premium',
        description: 'Lechuga romana, parmesano, crutones artesanales y nuestra salsa césar especial',
        price: 14,
        image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Lechuga romana', 'Parmesano', 'Crutones', 'Anchoas', 'Pollo (opcional)'],
        tags: ['Vegetariano'],
        rating: 4.6
      },
      {
        id: 'entrada-3',
        name: 'Tabla de Quesos Artesanales',
        description: 'Selección de quesos gourmet con frutos secos, miel y mermeladas caseras',
        price: 22,
        image: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Quesos artesanales', 'Frutos secos', 'Miel', 'Mermeladas', 'Pan tostado'],
        tags: ['Vegetariano'],
        rating: 4.9
      }
    ],
    principales: [
      {
        id: 'principal-1',
        name: 'Filete de Res Wellington',
        description: 'Tierno filete envuelto en pasta hojaldre con duxelles de hongos y foie gras',
        price: 45,
        image: 'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Filete de res', 'Pasta hojaldre', 'Hongos', 'Foie gras', 'Hierbas frescas'],
        tags: [],
        rating: 4.9
      },
      {
        id: 'principal-2',
        name: 'Salmón a la Parrilla',
        description: 'Salmón atlántico con quinoa, vegetables asados y salsa de eneldo',
        price: 32,
        image: 'https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Salmón atlántico', 'Quinoa', 'Vegetables', 'Eneldo', 'Limón'],
        tags: ['Sin gluten', 'Saludable'],
        rating: 4.7
      },
      {
        id: 'principal-3',
        name: 'Risotto de Hongos Trufados',
        description: 'Cremoso risotto con mezcla de hongos silvestres y aceite de trufa',
        price: 28,
        image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Arroz arborio', 'Hongos silvestres', 'Trufa', 'Parmesano', 'Vino blanco'],
        tags: ['Vegetariano'],
        rating: 4.8
      }
    ],
    postres: [
      {
        id: 'postre-1',
        name: 'Tiramisú Clásico',
        description: 'El auténtico tiramisú italiano con mascarpone, café y cacao',
        price: 12,
        image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Mascarpone', 'Café espresso', 'Ladyfingers', 'Cacao', 'Marsala'],
        tags: ['Vegetariano'],
        rating: 4.8
      },
      {
        id: 'postre-2',
        name: 'Tarta de Chocolate Belga',
        description: 'Intensa tarta de chocolate 70% con coulis de frutos rojos',
        price: 14,
        image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Chocolate belga', 'Frutos rojos', 'Crema', 'Mantequilla', 'Huevos'],
        tags: ['Vegetariano'],
        rating: 4.9
      }
    ],
    bebidas: [
      {
        id: 'bebida-1',
        name: 'Cóctel Signature',
        description: 'Nuestra creación especial con gin artesanal, frutos cítricos y hierbas frescas',
        price: 16,
        image: 'https://images.pexels.com/photos/1304541/pexels-photo-1304541.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Gin artesanal', 'Limón', 'Hierbas frescas', 'Tónica premium'],
        tags: [],
        rating: 4.7
      },
      {
        id: 'bebida-2',
        name: 'Agua Infusionada',
        description: 'Agua natural con pepino, menta y limón - perfecta para acompañar',
        price: 6,
        image: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=800',
        ingredients: ['Agua natural', 'Pepino', 'Menta', 'Limón'],
        tags: ['Sin alcohol', 'Vegano'],
        rating: 4.5
      }
    ]
  };

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'vegetariano': return <Leaf className="w-4 h-4 text-green-500" />;
      case 'vegano': return <Heart className="w-4 h-4 text-green-600" />;
      case 'sin gluten': return <Wheat className="w-4 h-4 text-amber-500" />;
      default: return null;
    }
  };

  const filteredItems = menuItems[activeCategory]?.filter(item => {
    if (dietFilter === 'all') return true;
    return item.tags.some(tag => tag.toLowerCase().includes(dietFilter));
  }) || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestra Carta
          </h2>
          <p className="text-xl text-gray-600">
            Descubre sabores únicos preparados con los mejores ingredientes
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center ${
                activeCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Diet Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                dietFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setDietFilter('vegetariano')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                dietFilter === 'vegetariano'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Leaf className="w-4 h-4 mr-1" />
              Vegetariano
            </button>
            <button
              onClick={() => setDietFilter('sin gluten')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                dietFilter === 'sin gluten'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Wheat className="w-4 h-4 mr-1" />
              Sin Gluten
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs font-medium"
                    >
                      {getTagIcon(tag)}
                      <span className="ml-1">{tag}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-sm font-medium">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {item.rating}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Ingredientes principales:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="text-gray-400 text-xs">
                        +{item.ingredients.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                >
                  <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay elementos disponibles para este filtro.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
export type { MenuItem };