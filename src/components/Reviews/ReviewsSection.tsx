import React, { useState } from 'react';
import { Star, User, ThumbsUp, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  dish: string;
  helpful: number;
  avatar?: string;
}

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'María González',
      rating: 5,
      date: '2024-01-15',
      comment: 'Increíble experiencia gastronómica. El filete Wellington estaba perfecto y el servicio fue excepcional. Definitivamente volveremos para celebrar nuestro próximo aniversario.',
      dish: 'Filete de Res Wellington',
      helpful: 12
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      rating: 5,
      date: '2024-01-12',
      comment: 'El mejor salmón que he probado en años. La presentación fue impecable y los sabores perfectamente balanceados. El ambiente es muy acogedor.',
      dish: 'Salmón a la Parrilla',
      helpful: 8
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rating: 4,
      date: '2024-01-10',
      comment: 'Excelente carta vegetariana. El risotto de hongos trufados fue una revelación. Solo le faltó un poco más de trufa, pero en general muy satisfecha.',
      dish: 'Risotto de Hongos Trufados',
      helpful: 6
    },
    {
      id: '4',
      name: 'Roberto Silva',
      rating: 5,
      date: '2024-01-08',
      comment: 'Celebramos aquí el cumpleaños de mi esposa y todo fue perfecto. El tiramisú casero fue el broche de oro perfecto para una noche memorable.',
      dish: 'Tiramisú Clásico',
      helpful: 15
    },
    {
      id: '5',
      name: 'Lucía Hernández',
      rating: 4,
      date: '2024-01-05',
      comment: 'El servicio de delivery fue muy rápido y la comida llegó caliente. Los cócteles están muy bien preparados. Solo sugiero mejorar el empaque para los postres.',
      dish: 'Cóctel Signature',
      helpful: 4
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    dish: ''
  });

  const [showForm, setShowForm] = useState(false);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => 
    reviews.filter(review => review.rating === star).length
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      dish: newReview.dish,
      helpful: 0
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '', dish: '' });
    setShowForm(false);
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Reseñas de Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-600">
            Lo que dicen quienes han disfrutado de nuestra experiencia gastronómica
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ratings Overview */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating), 'lg')}
              <p className="text-gray-600 mt-2">
                Basado en {reviews.length} reseñas
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-3">{star}</span>
                  <Star className="w-4 h-4 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${reviews.length > 0 ? (ratingDistribution[index] / reviews.length) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-6">
                    {ratingDistribution[index]}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Escribir Reseña
            </button>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {showForm && (
              <div className="bg-white border-2 border-orange-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Comparte tu Experiencia
                </h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plato Probado
                      </label>
                      <input
                        type="text"
                        value={newReview.dish}
                        onChange={(e) => setNewReview({...newReview, dish: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="¿Qué plato probaste?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calificación
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= newReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 hover:text-yellow-400'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tu Reseña
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Comparte tu experiencia con nosotros..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Publicar Reseña
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    
                    {review.dish && (
                      <p className="text-sm text-orange-600 font-medium mb-2">
                        Probó: {review.dish}
                      </p>
                    )}
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.comment}
                    </p>
                    
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Útil ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;