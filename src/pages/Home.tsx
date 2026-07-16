import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Star } from 'lucide-react';
import { recipeService } from '../services/recipeService';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Arama sonuçları için Query
  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ['searchRecipes', query],
    queryFn: () => recipeService.searchRecipes(query),
  });

  // YENİ: Haftanın Tarifi için Özel Query (Örn ID: 52771 - Spicy Arrabiata Penne)
  const { data: weeklyRecipe } = useQuery({
    queryKey: ['weeklyRecipe'],
    queryFn: () => recipeService.getRecipeById('52771'),
  });

  return (
    <div className="space-y-12 mt-4">
      
      {/* YENİ: HAFTANIN TARİFİ VİTRİNİ */}
      {!query && weeklyRecipe && (
        <div 
          onClick={() => navigate(`/recipe/${weeklyRecipe.idMeal}`)}
          className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-slate-100 dark:border-slate-800"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
          <img 
            src={weeklyRecipe.strMealThumb} 
            alt={weeklyRecipe.strMeal} 
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase flex items-center gap-1">
                <Star size={16} fill="currentColor" /> Haftanın Tarifi
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                {weeklyRecipe.strArea} Mutfağı
              </span>
            </div>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 line-clamp-1 leading-tight md:leading-tight lg:leading-tight pb-1">
  {weeklyRecipe.strMeal}
</h2>
<p className="text-slate-200 line-clamp-2 max-w-2xl text-base md:text-lg hidden md:block leading-relaxed">
  {weeklyRecipe.strInstructions}
</p>
          </div>
        </div>
      )}

      {/* ARAMA ÇUBUĞU */}
      <div className="max-w-3xl mx-auto relative group">
        <input
          type="text"
          className="w-full pl-6 pr-14 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm text-lg transition-colors"
          placeholder="Yemek tarifi ara (örn: chicken, beef, pasta)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => <RecipeCardSkeleton key={i} />)}
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 text-xl font-medium">Tarifler yüklenirken hata oluştu!</div>
      )}

      {/* YEMEK KARTLARI LİSTESİ */}
      {!isLoading && !isError && meals?.length === 0 ? (
        <div className="text-center text-slate-500 dark:text-slate-400 text-xl py-10">
          "{query}" için tarif bulunamadı. Lütfen başka bir arama yapın.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals?.map((meal: any) => (
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
                {meal.strCategory && (
                  <div className="mb-3">
                    <span className="inline-block bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {meal.strCategory}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white line-clamp-1 mb-1 transition-colors">
                  {meal.strMeal}
                </h3>
                {meal.strArea && (
                  <p className="text-slate-400 dark:text-slate-500 font-medium transition-colors">
                    {meal.strArea} Mutfağı
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}