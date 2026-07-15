import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/recipeService';

export default function Categories() {
  const navigate = useNavigate();

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: recipeService.getCategories,
  });

  if (isLoading) return <div className="text-center text-2xl mt-10 text-orange-500 animate-pulse">Kategoriler yükleniyor...</div>;
  if (isError) return <div className="text-center text-2xl mt-10 text-red-500">Kategoriler yüklenirken bir hata oluştu!</div>;

  return (
    <div className="space-y-8 mt-4">
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 transition-colors">
        Kategoriler 🍽️
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories?.map((category: any) => (
          <div 
            key={category.idCategory}
            onClick={() => navigate(`/category/${category.strCategory}`)}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-700 transition-all duration-300 cursor-pointer group flex flex-col items-center p-8"
          >
            <img 
              src={category.strCategoryThumb} 
              alt={category.strCategory} 
              className="w-48 h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <h3 className="text-2xl font-bold mt-6 text-slate-800 dark:text-white">{category.strCategory}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mt-3 line-clamp-3 leading-relaxed">
              {category.strCategoryDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}