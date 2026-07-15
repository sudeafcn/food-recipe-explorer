import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ChefHat, Shuffle, Moon, Sun, Menu, X } from 'lucide-react';
import { recipeService } from '../services/recipeService';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // YENİ: Mobil menü durumu

  // Sayfa değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleRandomRecipe = async () => {
    try {
      const recipe = await recipeService.getRandomRecipe();
      if (recipe) {
        navigate(`/recipe/${recipe.idMeal}`);
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.error("Rastgele tarif çekilirken hata oluştu", error);
    }
  };

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kategoriler', path: '/categories' },
    { name: 'Mutfaklar', path: '/areas' },
    { name: 'Malzemeler', path: '/ingredients' },
    { name: 'Favoriler', path: '/favorites' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ChefHat size={36} className="text-orange-500" />
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Taste<span className="text-orange-500">Hub</span>
              </span>
            </NavLink>

            {/* MASAÜSTÜ MENÜ (Mobilde Gizli) */}
            <nav className="hidden lg:flex items-center gap-6 mt-2">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  className={({ isActive }) => 
                    `text-lg font-semibold pb-1 transition-all ${
                      isActive ? 'text-orange-500 border-b-4 border-orange-500' : 'text-slate-500 dark:text-slate-400 hover:text-orange-400'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                onClick={toggleTheme}
                className="p-2 ml-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title={isDark ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
              >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <button 
                onClick={handleRandomRecipe}
                className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold hover:bg-orange-200 transition-colors ml-2"
              >
                <Shuffle size={18} /> Rastgele
              </button>
            </nav>

            {/* MOBİL MENÜ BUTONU (Masaüstünde Gizli) */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-800 dark:text-white p-2"
              >
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBİL AÇILIR MENÜ (Sadece butona basıldığında görünür) */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg absolute w-full left-0 transition-colors duration-300">
            <nav className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  className={({ isActive }) => 
                    `text-xl font-semibold p-3 rounded-xl transition-all ${
                      isActive ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-500' : 'text-slate-600 dark:text-slate-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button 
                onClick={handleRandomRecipe}
                className="flex items-center justify-center gap-2 bg-orange-100 text-orange-600 px-4 py-4 rounded-xl font-bold text-lg mt-4"
              >
                <Shuffle size={20} /> Rastgele Tarif Getir
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}