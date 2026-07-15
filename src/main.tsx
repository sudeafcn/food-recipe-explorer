import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Yeni eklenen
import App from './App.tsx';
import './index.css';

// Query Client'ı oluşturuyoruz
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Kullanıcı sekmeye dönünce veriyi baştan çekmeyi kapat
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Tüm uygulamayı QueryProvider ile sarmalıyoruz */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);