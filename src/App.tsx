import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Categories from './pages/Categories';
import CategoryMeals from './pages/CategoryMeals';
import Areas from './pages/Areas';
import AreaMeals from './pages/AreaMeals';
import Ingredients from './pages/Ingredients';
import IngredientMeals from './pages/IngredientMeals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="favorites" element={<Favorites />} />
          
          <Route path="categories" element={<Categories />} />
          <Route path="category/:categoryName" element={<CategoryMeals />} />
          
          <Route path="areas" element={<Areas />} />
          <Route path="area/:areaName" element={<AreaMeals />} />
          
          {/* YENİ EKLENEN ROTALAR (MALZEMELER) */}
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="ingredient/:ingredientName" element={<IngredientMeals />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;