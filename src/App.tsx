import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Home/Hero';
import Features from './components/Home/Features';
import MenuSection, { MenuItem } from './components/Menu/MenuSection';
import ReservationSection from './components/Reservations/ReservationSection';
import DeliverySection from './components/Delivery/DeliverySection';
import ReviewsSection from './components/Reviews/ReviewsSection';
import ContactSection from './components/Contact/ContactSection';

interface CartItem extends MenuItem {
  quantity: number;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero setActiveSection={setActiveSection} />
            <Features />
          </>
        );
      case 'menu':
        return <MenuSection addToCart={addToCart} />;
      case 'reservations':
        return <ReservationSection />;
      case 'delivery':
        return (
          <DeliverySection
            cartItems={cartItems}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        );
      case 'reviews':
        return <ReviewsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <>
            <Hero setActiveSection={setActiveSection} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {/* Main Content with top padding to account for fixed header */}
      <main className="pt-20">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-2 rounded-lg">
                  <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold">Sabor Auténtico</h3>
                  <p className="text-gray-400 text-sm">Cocina Gourmet</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Creando experiencias gastronómicas únicas desde 2015. 
                Cada plato cuenta una historia de sabor y tradición.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Nuestra Historia</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Carta Completa</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Eventos Privados</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Trabaja con Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Reservas Online</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Delivery & Takeout</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Gourmet Street</p>
                <p>Downtown, Ciudad 12345</p>
                <p>+1 (555) 123-4567</p>
                <p>info@saborautentico.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Sabor Auténtico. Todos los derechos reservados. | 
              <a href="#" className="hover:text-orange-400 transition-colors ml-1">Política de Privacidad</a> | 
              <a href="#" className="hover:text-orange-400 transition-colors ml-1">Términos de Servicio</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;