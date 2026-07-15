import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]);

  // Favorileri LocalStorage'dan çekiyoruz
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="space-y-8 mt-4">
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 flex items-center gap-3 transition-colors">
        <Heart className="text-orange-500 fill-orange-500" size={32} /> Favorilerim
      </h2>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="text-7xl mb-6">💔</div>
          <h3 className="text-3xl font-bold text-slate-700 dark:text-white mb-4 transition-colors">Henüz favori tarifin yok!</h3>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8 transition-colors">
            Beğendiğin tariflerdeki kalp ikonuna tıklayarak onları buraya ekleyebilirsin.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-orange-100 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-200 transition-colors"
          >
            Tarifleri Keşfet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((meal: any) => (
            <div 
              key={meal.idMeal} 
              onClick={() => navigate(`/recipe/${meal.idMeal}`)}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-700 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="overflow-hidden">
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white line-clamp-1 mb-1 transition-colors">
                  {meal.strMeal}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}