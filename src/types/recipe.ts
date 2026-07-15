// Bir yemek tarifinin sahip olacağı temel özellikler
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

// API'den dönen ana cevap yapısı
export interface RecipeResponse {
  meals: Recipe[] | null;
}