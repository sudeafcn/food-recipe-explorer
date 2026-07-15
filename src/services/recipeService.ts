import type { RecipeResponse } from '../types/recipe';
import { api } from '../api/axios';

export const recipeService = {
  searchRecipes: async (query: string = '') => {
    const response = await api.get<RecipeResponse>(`/search.php?s=${query}`);
    return response.data.meals || [];
  },
  
  getRecipeById: async (id: string) => {
    const response = await api.get<RecipeResponse>(`/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  getRandomRecipe: async () => {
    const response = await api.get<RecipeResponse>('/random.php');
    return response.data.meals ? response.data.meals[0] : null;
  },

  getCategories: async () => {
    const response = await api.get('/categories.php');
    return response.data.categories || [];
  },
  
  getMealsByCategory: async (category: string) => {
    const response = await api.get(`/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  getAreas: async () => {
    const response = await api.get('/list.php?a=list');
    return response.data.meals || [];
  },

  getMealsByArea: async (area: string) => {
    const response = await api.get(`/filter.php?a=${area}`);
    return response.data.meals || [];
  },

  // YENİ EKLENEN: Tüm malzemeleri getiren fonksiyon
  getIngredients: async () => {
    const response = await api.get('/list.php?i=list');
    return response.data.meals || [];
  },

  // YENİ EKLENEN: Seçilen malzemeye ait yemekleri getiren fonksiyon
  getMealsByIngredient: async (ingredient: string) => {
    const response = await api.get(`/filter.php?i=${ingredient}`);
    return response.data.meals || [];
  }
};