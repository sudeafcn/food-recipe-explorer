import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../services/recipeService';
// HATA ÇÖZÜMÜ 1: Youtube yerine PlayCircle ikonunu dahil ettik
import { ArrowLeft, Heart, Share2, PlayCircle, ChefHat, StickyNote, Check } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [note, setNote] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { data: meal, isLoading, isError } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeService.getRecipeById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (meal) {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isFav = savedFavorites.some((fav: any) => fav.idMeal === meal.idMeal);
      setIsFavorite(isFav);

      const savedNotes = JSON.parse(localStorage.getItem('recipeNotes') || '{}');
      if (savedNotes[meal.idMeal]) {
        setNote(savedNotes[meal.idMeal]);
      }
    }
  }, [meal]);

  const toggleFavorite = () => {
    if (!meal) return;
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = savedFavorites.filter((fav: any) => fav.idMeal !== meal.idMeal);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      savedFavorites.push(meal);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setIsFavorite(true);
    }
  };

  const handleSaveNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    if (!meal) return;
    
    const savedNotes = JSON.parse(localStorage.getItem('recipeNotes') || '{}');
    savedNotes[meal.idMeal] = newNote;
    localStorage.setItem('recipeNotes', JSON.stringify(savedNotes));
  };

  const handleShare = async () => {
    const shareData = {
      title: meal?.strMeal,
      text: `${meal?.strMeal} tarifini TasteHub'da keşfettim!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.log('Paylaşım iptal edildi veya desteklenmiyor.');
    }
  };

  if (isLoading) return <div className="text-center text-2xl mt-10 text-orange-500 animate-pulse">Tarif detayları hazırlanıyor...</div>;
  if (isError || !meal) return <div className="text-center text-2xl mt-10 text-red-500">Tarif bulunamadı!</div>;

  // HATA ÇÖZÜMÜ 2: TypeScript'i rahatlatmak için veriyi 'any' tipine çevirdik
  const ingredients = [];
  const mealData = meal as any; 

  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`] && mealData[`strIngredient${i}`].trim() !== '') {
      ingredients.push({
        ingredient: mealData[`strIngredient${i}`],
        measure: mealData[`strMeasure${i}`]
      });
    }
  }

  const youtubeUrl = meal.strYoutube ? meal.strYoutube.replace('watch?v=', 'embed/') : null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-4 pb-20">
      
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <Check size={20} className="text-green-400" /> Link kopyalandı!
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b dark:border-slate-800 pb-6 transition-colors">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white transition-colors line-clamp-2">
            {meal.strMeal}
          </h1>
        </div>
        <div className="flex items-center gap-3 pl-12 sm:pl-0">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Share2 size={20} /> Paylaş
          </button>
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-colors ${
              isFavorite 
                ? 'bg-red-100 text-red-500 dark:bg-red-900/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Heart size={20} className={isFavorite ? "fill-red-500" : ""} />
            {isFavorite ? 'Favorilerde' : 'Favoriye Ekle'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-1 space-y-6">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-lg border-4 border-white dark:border-slate-800 transition-colors" 
          />
          
          <div className="flex flex-wrap gap-2">
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider">
              {meal.strCategory}
            </span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider">
              {meal.strArea} Mutfağı
            </span>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50 rounded-2xl p-5 shadow-sm transition-colors">
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-2 mb-3">
              <StickyNote size={20} /> Benim Notlarım
            </h3>
            <textarea
              value={note}
              onChange={handleSaveNote}
              placeholder="Bu tarif için özel notlarını buraya yaz... (Örn: Tuzu biraz az konulacak, 10 dk fazla pişirilecek)"
              className="w-full h-32 p-3 rounded-xl border border-yellow-200 dark:border-yellow-700/50 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition-colors"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
          
          <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3 mb-6">
              <ChefHat className="text-orange-500" size={28} /> Malzemeler
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {ingredients.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b dark:border-slate-700 pb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 capitalize">{item.ingredient}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6 transition-colors">
              Hazırlanış Adımları
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                {meal.strInstructions}
              </p>
            </div>
          </section>

          {youtubeUrl && (
            <section>
              {/* İKON BURADA DEĞİŞTİ */}
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3 mb-6 transition-colors">
                <PlayCircle className="text-red-500" size={28} /> Videolu Anlatım
              </h2>
              <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700">
                <iframe 
                  src={youtubeUrl} 
                  title="YouTube video player" 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}