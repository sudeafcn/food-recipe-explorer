import axios from 'axios';

// .env dosyasından kök linki alıyoruz
const baseURL = import.meta.env.VITE_API_URL;

// Tüm isteklerde kullanılacak ana axios kopyasını oluşturuyoruz
export const api = axios.create({
  baseURL,
  timeout: 10000, // İstek 10 saniyeden uzun sürerse iptal et (opsiyonel ama profesyonel)
});