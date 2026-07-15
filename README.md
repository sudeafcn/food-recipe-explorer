# 🧑‍🍳 TasteHub - Modern Yemek Tarifi Keşif Rehberi

[![Canlı Demo](https://img.shields.io/badge/Canl%C4%B1_Demo-G%C3%B6r%C3%BCnt%C3%BCle-orange?style=for-the-badge&logo=vercel)](https://SENIN_VERCEL_LINKIN.vercel.app)

TasteHub, dünya mutfaklarından binlerce tarifi keşfedebileceğiniz, malzemelere ve kategorilere göre filtreleme yapabileceğiniz, tamamen modern ve mobil uyumlu bir web uygulamasıdır. TheMealDB API kullanılarak geliştirilmiş olup, zengin kullanıcı deneyimi (UI/UX) standartlarına göre tasarlanmıştır.

## 🚀 Proje Özellikleri

TasteHub, dünya mutfaklarından binlerce tarifi keşfedebileceğiniz, malzemelere ve kategorilere göre filtreleme yapabileceğiniz, tamamen modern ve mobil uyumlu bir web uygulamasıdır. TheMealDB API kullanılarak geliştirilmiş olup, zengin kullanıcı deneyimi (UI/UX) standartlarına göre tasarlanmıştır.

## 🚀 Proje Özellikleri

### Temel İşlevler
* **Gelişmiş Arama:** Yemek adına göre anında tarif arama motoru.
* **Akıllı Filtreleme:** Tariflere Kategori (Örn: Deniz Ürünleri), Ülke (Örn: İtalyan Mutfağı) ve Malzeme (Örn: Tavuk) bazlı detaylı filtreleme.
* **Detaylı Tarif Sayfası:** İlgili yemeğin ölçülü malzeme listesi, adım adım hazırlanışı ve YouTube gömülü videolu anlatımı.
* **Rastgele Tarif:** Ne yiyeceğine karar veremeyenler için tek tıkla rastgele tarif getirme özelliği.

### Gelişmiş (Bonus) Özellikler
* **Haftanın Tarifi:** Ana sayfada öne çıkan, özel tasarımlı vitrin tarifi.
* **Kişiselleştirilmiş Favoriler:** Beğenilen tarifleri favorilere ekleme ve LocalStorage sayesinde veri kaybı olmadan saklama.
* **Tarif Notları:** Her tarife özel "Benim Notlarım" alanı ile yerel belleğe kullanıcı notları kaydetme.
* **Hızlı Paylaşım:** Web Share API entegrasyonu ile tarifleri sosyal platformlarda veya bağlantı kopyalayarak (Toast bildirimli) paylaşma.

### Arayüz ve Kullanıcı Deneyimi (UI/UX)
* **Dark/Light Mode:** Tercihe veya sistem ayarına göre pürüzsüz geçiş yapan karanlık ve aydınlık tema desteği.
* **Skeleton Loading:** Veriler yüklenirken API bekleme sürelerini maskeleyen, modern ve animasyonlu iskelet yükleme ekranları.
* **Mobil Uyumluluk:** Her ekran boyutuna uyum sağlayan Responsive tasarım ve mobil cihazlar için özel Hamburger Navigasyon Menüsü.
* **Hata Yönetimi:** Hatalı API isteklerinde veya boş sonuçlarda kullanıcıyı yönlendiren "Empty State" (Boş Durum) tasarımları ve 404 sayfası.

## 🛠️ Kullanılan Teknolojiler

* **Core:** React, TypeScript, Vite
* **Routing:** React Router v6
* **State & Data Management:** TanStack Query (React Query), LocalStorage
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **API:** TheMealDB API


## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Repoyu bilgisayarınıza klonlayın:
   ```bash
   git clone [https://github.com/KULLANICI_ADIN/tastehub.git](https://github.com/KULLANICI_ADIN/tastehub.git)

2. Proje dizinine gidin:
   ```bash
   cd food-recipe-explorer

3. Gerekli paketleri yükleyin: 
   ```bash
   npm install

4. Geliştirici sunucusunu başlatın:
   ```bash
   npm run dev

5. Tarayıcınızda http://localhost:5173 adresine giderek uygulamayı görüntüleyin.