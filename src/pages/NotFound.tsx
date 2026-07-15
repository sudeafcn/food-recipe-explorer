import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <ChefHat size={120} className="text-slate-200 mb-6" />
      <h1 className="text-7xl font-extrabold text-orange-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-slate-700 mb-4">Mutfakta böyle bir sayfa yok! 🍳</h2>
      <p className="text-lg text-slate-500 mb-8 max-w-md">
        Aradığın tarif yanmış, dökülmüş ya da hiç var olmamış olabilir. En iyisi ana menüye dönmek.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-lg"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  );
}