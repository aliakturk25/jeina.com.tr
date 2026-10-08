# Jeina.com.tr — Kurumsal Tanıtım Sitesi ve Web CMS Paneli

Bu depo, **Jeina E-Ticaret Pazaryeri Entegrasyon Sistemleri** için kurumsal B2B tanıtım sitesini ve sitenin tüm vitrinini (fiyatlar, paketler, demo talepleri, formlar ve dinamik paket sayfaları) yöneten hafif yönetim panelini (CMS) içerir.

## Özellikler

### 1. Tanıtım Vitrini (Frontend)
- **Anti-AI / Enterprise Sharp:** Yapay zeka klişelerinden ve karmaşık degradelerden arındırılmış, 1px keskin sınırlara sahip profesyonel kurumsal B2B tasarım dili.
- **İşaretsiz & Net Tablolar:** Tik (`✓`) gibi klişe işaretler yerine net teknik veri etiketleri ve sayısal metrikler.
- **Saha Modülleri Vitrini:** Babyanimals / Jeina altyapısındaki gerçek modüller (Trendyol, Hepsiburada, N11, Barkodlu Depo & Paketleme Masası, Fiyat Onay Kalkanı, Plus Komisyon Analitiği).
- **İnteraktif Tasarruf & ROI Simülatörü:** Ziyaretçinin sipariş hacmine göre engellenen hatalı kargo maliyetini ve kazanılan çalışma saatini anlık hesaplar.
- **Yüksek Dönüşümlü Demo Talep Formu:** Otomatik paket seçimi ve doğrudan yönetim paneline aktarım.

### 2. Frontend Yönetim Paneli (CMS)
- **Demo Talepleri (Lead CRM):** Gelen tüm demo ve teklif taleplerini listeleme, arama, filtreleme, durum rozeti güncelleme (`Yeni`, `Arandı`, `Demo Yapıldı`, `Satışa Döndü`) ve tek tıkla **CSV/Excel indirme**.
- **Paket ve Fiyat Yönetimi:** Yeni paketler ekleme, fiyatları güncelleme, özellik maddelerini düzenleme ve vitrinde anında yayınlama.
- **Dinamik Sayfa Oluşturucu (Landing Page Builder):** Kod yazmadan yeni pazaryeri entegrasyon sayfaları (örn: `/trendyol-entegrasyonu`, `/depo-ve-hizli-paketleme-masasi`) oluşturma.
- **İletişim Mesajları:** Gelen iletişim formlarını okuma ve e-posta ile yanıtlama.
- **Site & Bildirim Ayarları:** Genel şirket bilgileri ve anlık Telegram bildirim entegrasyonu.

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Canlı derleme (Production Build)
npm run build
```

## GitHub Dağıtımı

```bash
git add .
git commit -m "feat: initial commit for jeina.com.tr showcase and CMS"
git push -u origin main
```
