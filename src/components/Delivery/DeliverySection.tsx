import React, { useState } from 'react';
import { Truck, Clock, CreditCard, MapPin, ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../Menu/MenuSection';

interface CartItem extends MenuItem {
  quantity: number;
}

interface DeliverySectionProps {
  cartItems: CartItem[];
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const DeliverySection: React.FC<DeliverySectionProps> = ({
  cartItems,
  updateCartQuantity,
  removeFromCart,
  clearCart
}) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    phone: '',
    paymentMethod: 'card',
    notes: ''
  });
  const [orderStatus, setOrderStatus] = useState<'cart' | 'checkout' | 'confirmed' | 'preparing' | 'onway' | 'delivered'>('cart');

  const deliveryFee = 5;
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('confirmed');
    
    // Simulate order progression
    setTimeout(() => setOrderStatus('preparing'), 2000);
    setTimeout(() => setOrderStatus('onway'), 8000);
    setTimeout(() => setOrderStatus('delivered'), 15000);
  };

  const getStatusMessage = () => {
    switch (orderStatus) {
      case 'confirmed':
        return {
          title: '¡Pedido Confirmado!',
          message: 'Hemos recibido tu orden y comenzaremos a prepararla pronto.',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'preparing':
        return {
          title: 'Preparando tu Pedido',
          message: 'Nuestros chefs están preparando tu deliciosa comida.',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        };
      case 'onway':
        return {
          title: 'En Camino',
          message: 'Tu pedido está en camino. Tiempo estimado: 15 minutos.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };
      case 'delivered':
        return {
          title: '¡Entregado!',
          message: '¡Disfruta tu comida! Gracias por elegir Sabor Auténtico.',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      default:
        return null;
    }
  };

  if (orderStatus !== 'cart') {
    const status = getStatusMessage();
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`${status?.bgColor} rounded-2xl p-12 shadow-lg`}>
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 ${status?.bgColor} rounded-full flex items-center justify-center border-4 border-white`}>
                <Truck className={`w-12 h-12 ${status?.color}`} />
              </div>
            </div>
            <h2 className={`text-4xl font-bold ${status?.color} mb-4`}>
              {status?.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {status?.message}
            </p>
            
            {orderStatus === 'delivered' && (
              <button
                onClick={() => {
                  setOrderStatus('cart');
                  clearCart();
                }}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
              >
                Hacer Nuevo Pedido
              </button>
            )}

            {/* Order Progress */}
            {orderStatus !== 'delivered' && (
              <div className="mt-8">
                <div className="flex justify-center items-center space-x-4">
                  {['confirmed', 'preparing', 'onway', 'delivered'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${
                        ['confirmed', 'preparing', 'onway', 'delivered'].indexOf(orderStatus) >= index
                          ? 'bg-orange-600'
                          : 'bg-gray-300'
                      }`} />
                      {index < 3 && (
                        <div className={`w-16 h-1 ${
                          ['confirmed', 'preparing', 'onway', 'delivered'].indexOf(orderStatus) > index
                            ? 'bg-orange-600'
                            : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600 max-w-xs mx-auto">
                  <span>Confirmado</span>
                  <span>Preparando</span>
                  <span>En Camino</span>
                  <span>Entregado</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Delivery & Pedidos
          </h2>
          <p className="text-xl text-gray-600">
            Disfruta de nuestros platos desde la comodidad de tu hogar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Tu Carrito ({cartItems.length})
                </h3>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Vaciar Carrito
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-500 mb-2">
                    Tu carrito está vacío
                  </h4>
                  <p className="text-gray-400">
                    Agrega algunos platos deliciosos desde nuestra carta
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-gray-600 text-sm">${item.price} c/u</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Información de Entrega
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-orange-600 mr-2" />
                  <span>Tiempo estimado: 30-45 min</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-orange-600 mr-2" />
                  <span>Radio de entrega: 10 km</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Resumen del Pedido
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impuestos:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Finalizar Pedido
                  </h3>
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección de Entrega
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Calle, número, referencias"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Método de Pago
                      </label>
                      <select
                        value={deliveryInfo.paymentMethod}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, paymentMethod: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="card">Tarjeta de Crédito/Débito</option>
                        <option value="cash">Efectivo</option>
                        <option value="transfer">Transferencia</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notas Especiales (Opcional)
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryInfo.notes}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, notes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Instrucciones especiales para la entrega"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Realizar Pedido - ${total.toFixed(2)}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;