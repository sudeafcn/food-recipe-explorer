import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/recipeService';
import { ShoppingBasket } from 'lucide-react';

export default function Ingredients() {
  const navigate = useNavigate();

  const { data: ingredients, isLoading, isError } = useQuery({
    queryKey: ['ingredients'],
    queryFn: recipeService.getIngredients,
  });

  if (isLoading) return <div className="text-center text-2xl mt-10 text-orange-500 animate-pulse">Malzemeler yükleniyor...</div>;
  if (isError) return <div className="text-center text-2xl mt-10 text-red-500">Malzemeler yüklenirken hata oluştu!</div>;

  return (
    <div className="space-y-8 mt-4">
      {/* BAŞLIK */}
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 flex items-center gap-3 transition-colors">
        <ShoppingBasket className="text-orange-500" size={32} /> Malzemeler
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ingredients?.slice(0, 100).map((item: any) => (
          <div
            key={item.idIngredient}
            onClick={() => navigate(`/ingredient/${item.strIngredient}`)}
            /* KARTLAR - Karanlık mod renkleri eklendi */
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 flex flex-col items-center hover:shadow-lg dark:hover:shadow-slate-700 hover:border-orange-500 transition-all cursor-pointer group"
          >
            <img
              src={`https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`}
              alt={item.strIngredient}
              className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            {/* KART YAZISI */}
            <h3 className="text-center font-bold text-slate-700 dark:text-slate-200 mt-4 group-hover:text-orange-500 transition-colors line-clamp-1">
              {item.strIngredient}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}