import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../services/recipeService';
import { ArrowLeft, MapPin } from 'lucide-react';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';

export default function AreaMeals() {
  const { areaName } = useParams();
  const navigate = useNavigate();

  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ['areaMeals', areaName],
    queryFn: () => recipeService.getMealsByArea(areaName as string),
    enabled: !!areaName,
  });

  // YENİ EKLENEN: Yükleniyor yazısı yerine Skeleton tasarımı
  if (isLoading) {
    return (
      <div className="space-y-8 mt-4">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="w-64 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Sahte bir dizi oluşturup 8 tane iskelet kart basıyoruz */}
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
          <MapPin className="text-orange-500" size={32} /> {areaName} <span className="text-slate-400 font-medium text-xl">Mutfağı</span>
        </h2>
      </div>
      
      {(!meals || meals.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="text-7xl mb-6">🍽️</div>
          <h3 className="text-3xl font-bold text-slate-700 mb-4">Bu mutfak henüz keşfedilmedi!</h3>
          <p className="text-lg text-slate-500 max-w-md mb-8">
            Şeflerimiz {areaName} mutfağına ait en lezzetli tarifleri arıyor. Lütfen daha sonra tekrar kontrol et veya başka bir mutfağı keşfetmeye başla.
          </p>
          <button 
            onClick={() => navigate('/areas')}
            className="bg-orange-100 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-200 transition-colors"
          >
            Diğer Mutfaklara Göz At
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