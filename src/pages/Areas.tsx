import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/recipeService';
import { Globe } from 'lucide-react';

export default function Areas() {
  const navigate = useNavigate();

  const { data: areas, isLoading, isError } = useQuery({
    queryKey: ['areas'],
    queryFn: recipeService.getAreas,
  });

  if (isLoading) return <div className="text-center text-2xl mt-10 text-orange-500 animate-pulse">Mutfaklar yükleniyor...</div>;
  if (isError) return <div className="text-center text-2xl mt-10 text-red-500">Mutfaklar yüklenirken bir hata oluştu!</div>;

  return (
    <div className="space-y-8 mt-4">
      {/* BAŞLIK - dark:text-white ve dark:border-slate-700 eklendi */}
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 flex items-center gap-3 transition-colors">
        <Globe className="text-orange-500" size={32} /> Dünya Mutfakları
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {areas?.map((area: any) => (
          <div 
            key={area.strArea}
            onClick={() => navigate(`/area/${area.strArea}`)}
            /* KARTLAR - dark:bg-slate-800 ve dark:border-slate-700 eklendi */
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 text-center hover:shadow-lg dark:hover:shadow-slate-700 hover:border-orange-500 transition-all cursor-pointer group"
          >
            {/* KART YAZISI - dark:text-slate-200 eklendi */}
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 group-hover:text-orange-500 transition-colors">
              {area.strArea}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}