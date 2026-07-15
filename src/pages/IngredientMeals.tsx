import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../services/recipeService';
import { ArrowLeft, Utensils } from 'lucide-react';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';

export default function IngredientMeals() {
  const { ingredientName } = useParams();
  const navigate = useNavigate();

  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ['ingredientMeals', ingredientName],
    queryFn: () => recipeService.getMealsByIngredient(ingredientName as string),
    enabled: !!ingredientName,
  });

  // YENİ: Yükleniyor yazısı yerine Skeleton tasarımı
  if (isLoading) {
    return (
      <div className="space-y-8 mt-4">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="w-64 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <div className="text-center text-2xl mt-10 text-red-500">Tarifler yüklenirken hata oluştu!</div>;

  return (
    <div className="space-y-8 mt-4">
      <div className="flex items-center gap-4 border-b pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <Utensils className="text-orange-500" size={32} /> {ingredientName} <span className="text-slate-400 font-medium text-xl">İçeren Tarifler</span>
        </h2>
      </div>
      
      {(!meals || meals.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="text-7xl mb-6">🥑</div>
          <h3 className="text-3xl font-bold text-slate-700 mb-4">Tarif bulunamadı!</h3>
          <p className="text-lg text-slate-500 max-w-md mb-8">
            İçerisinde {ingredientName} bulunan bir tarif henüz sistemimizde yok. Farklı malzemeleri denemek isteyebilirsin.
          </p>
          <button 
            onClick={() => navigate('/ingredients')}
            className="bg-orange-100 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-200 transition-colors"
          >
            Malzemelere Geri Dön
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal: any) => (
            <div 
              key={meal.idMeal} 
              onClick={() => navigate(`/recipe/${meal.idMeal}`)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="overflow-hidden">
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mt-2 text-slate-800 line-clamp-1">{meal.strMeal}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}