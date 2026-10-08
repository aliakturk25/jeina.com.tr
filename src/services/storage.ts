import { IntegrationPackage, DynamicPage, DemoLead, ContactMessage, SiteSettings } from '../types';

const PACKAGES_KEY = 'jeina_packages';
const PAGES_KEY = 'jeina_pages';
const LEADS_KEY = 'jeina_leads';
const MESSAGES_KEY = 'jeina_messages';
const SETTINGS_KEY = 'jeina_settings';

const defaultPackages: IntegrationPackage[] = [
  {
    id: 'pkg-1',
    name: 'Başlangıç Planı',
    badge: 'Yeni Başlayanlar',
    isPopular: false,
    priceMonthly: 1250,
    priceAnnualMonthly: 990,
    description: 'Pazaryeri satışına yeni başlayan, temel stok ve sipariş aktarımı arayan satıcılar için.',
    marketplaceCount: '2 Adet Pazaryeri',
    syncSpeed: '5 Dakikada Bir Senkronizasyon',
    orderLimit: '500 Sipariş / Ay',
    warehouseModule: 'Standart Sipariş Listesi',
    priceProtection: 'Temel Eşleme',
    commissionAnalysis: 'Standart Raporlama',
    supportLevel: 'E-Posta Desteği',
    features: [
      '2 Pazaryeri (Trendyol ve Hepsiburada seçeneği)',
      'Otomatik Çift Yönlü Stok Eşitleme',
      'Toplu Ürün ve Varyant Aktarımı',
      'Temel Satış ve Sipariş Takibi',
      'E-Fatura Şablonu Entegrasyonu',
      'Kargo Takip Numarası Gönderimi'
    ]
  },
  {
    id: 'pkg-2',
    name: 'Profesyonel Plan',
    badge: 'En Çok Tercih Edilen',
    isPopular: true,
    priceMonthly: 2850,
    priceAnnualMonthly: 2290,
    description: 'Yüksek sipariş hacmi olan, depo hatalarından ve hatalı fiyat zararlarından korunmak isteyen işletmeler için.',
    marketplaceCount: 'Tüm Pazaryerleri (Trendyol, HB, N11, Çiçeksepeti, Pazarama, PTTAVM)',
    syncSpeed: 'Anlık Senkronizasyon (3.2 Saniye)',
    orderLimit: 'Sınırsız Sipariş Hacmi',
    warehouseModule: 'Barkodlu Depo & Hızlı Paketleme Masası',
    priceProtection: 'Zarar Önleyici Fiyat & Stok Onay Kalkanı',
    commissionAnalysis: 'Plus Komisyon & Net Karlılık Simülatörü',
    supportLevel: 'Öncelikli Telefon & WhatsApp Desteği',
    features: [
      'Tüm Pazaryerleri Çift Yönlü Tam Yetki',
      'Anlık Stok ve Fiyat Senkronizasyonu (3.2 sn)',
      'Barkod Okuyuculu Hızlı Paketleme Masası',
      'Depo Reyon Bazlı Akıllı Toplama Listesi',
      'Hatalı Fiyat & Stok Uyuşmazlık Koruma Kalkanı',
      'Trendyol Plus Komisyon Analizi ve Simülasyonu',
      'Excel Mutabakat ve Fiziksel Sayım Karşılaştırma',
      'Otomatik Çoklu Kargo Barkodu ve E-Fatura Basımı'
    ]
  },
  {
    id: 'pkg-3',
    name: 'Kurumsal / Enterprise',
    badge: 'Büyük Ölçekli Operasyonlar',
    isPopular: false,
    priceMonthly: 5900,
    priceAnnualMonthly: 4750,
    description: 'Özel ERP bağlantısı, çoklu depo veya özel iş kuralları gerektiren yüksek hacimli markalar için.',
    marketplaceCount: 'Sınırsız Pazaryeri ve Çoklu Mağaza',
    syncSpeed: 'Öncelikli Dedicated Kuyruk Sunucusu',
    orderLimit: 'Sınırsız Sipariş ve Ürün',
    warehouseModule: 'Çoklu Depo & WMS Gelişmiş Dağıtım',
    priceProtection: 'Özel Risk Toleransı & Otomatik Fiyat Koruma',
    commissionAnalysis: 'Özel Muhasebe ve Karlılık Entegrasyonu',
    supportLevel: '7/24 Özel Müşteri Temsilcisi & SLA',
    features: [
      'Sınırsız Pazaryeri, Mağaza ve Alt Tedarikçi',
      'Özel ERP ve Muhasebe Entegrasyonu (Logo, Mikro, Nebim)',
      'Çoklu Depo ve Bölgesel Stok Tahsisi',
      'Rakip Fiyat Otomatik İzleme ve Telegram Botu',
      'Dedike Sunucu Kuyruğu (Yüksek Hız Garantisi)',
      'Yönetici ve Personel Özel Yetki / Rol Matrisi',
      'Özel SLA ve 7/24 Kesintisiz Telefon Desteği',
      'Yıllık Sözleşmeli Yerinde Kurulum ve Eğitim'
    ]
  }
];

const defaultPages: DynamicPage[] = [
  {
    id: 'page-1',
    slug: 'trendyol-entegrasyonu',
    title: 'Trendyol Entegrasyon Paketi',
    metaDescription: 'Trendyol mağazanızı Jeina ile bağlayın; anlık stok, Plus komisyon analizi ve tek tıkla kargo barkoduyla sıfır hata ile satın.',
    heroBadge: 'Resmi Çift Yönlü API',
    heroTitle: 'Trendyol Entegrasyonunda Sıfır Hata ve Maksimum Buybox',
    heroSubtitle: 'Siparişler saniyeler içinde panelinize düşsün, stoklar otomatik güncellensin, hatalı paketlemeler barkod okuma ile tamamen sıfırlansın.',
    targetMarketplace: 'Trendyol',
    isActive: true,
    createdAt: '2026-03-01',
    updatedAt: '2026-04-01',
    blocks: [
      {
        id: 'b-1',
        type: 'features',
        title: 'Trendyol Operasyonunuza Özel Çözümler',
        subtitle: 'Sahadaki gerçek gereksinimlere göre geliştirilmiş teknik araçlar',
        items: [
          { title: 'Çift Yönlü Anlık Stok Senkronizasyonu', desc: 'Trendyol’da satılan ürün diğer tüm kanallarda ve deponuzda 3.2 saniyede güncellenir.' },
          { title: 'Plus Komisyon ve Karlılık Analitiği', desc: 'Trendyol komisyon kesintilerini, kampanya indirimlerini ve net kar marjınızı tek ekranda görün.' },
          { title: 'Tek Tıkla Kargo Barkodu Basımı', desc: 'Sipariş geldiği an Trendyol anlaşmalı kargo etiketi ve e-fatura hazır hale gelir.' },
          { title: 'Hatalı Fiyat Onay Kalkanı', desc: 'Yanlışlıkla girilen 1 TL gibi hatalı fiyatlar Trendyol’a gitmeden sistem tarafından durdurulur.' }
        ]
      },
      {
        id: 'b-2',
        type: 'faq',
        title: 'Trendyol Entegrasyonu Hakkında Sıkça Sorulan Sorular',
        items: [
          { title: 'Kurulum ne kadar sürer?', desc: 'API anahtarlarınızı girdikten sonra ürün aktarımı ve stok eşitlemesi ortalama 15 dakika içinde tamamlanır.' },
          { title: 'Mevcut ürünlerim silinir mi?', desc: 'Hayır, mevcut Trendyol kataloğunuzdaki barkodlar ve stok kodları korunarak eşleştirme yapılır.' },
          { title: 'Farklı varyantları (renk, beden) destekliyor mu?', desc: 'Evet, sınırsız renk, beden ve model varyant eşlemesi tam uyumlu olarak aktarılır.' }
        ]
      }
    ]
  },
  {
    id: 'page-2',
    slug: 'depo-ve-hizli-paketleme-masasi',
    title: 'Barkodlu Depo & Hızlı Paketleme Masası',
    metaDescription: 'E-ticarette yanlış ürün gönderimini sıfırlayan, reyon bazlı toplama ve sesli barkod onay masası çözümü.',
    heroBadge: 'Operasyonel Depo Modülü',
    heroTitle: 'Yanlış Ürün Gönderimini Sıfırlayan Depo Masası',
    heroSubtitle: 'Barkod okutulmadan kargo etiketi basılmaz. Reyon toplama rotası ile personel verimliliğini %40 artırın.',
    targetMarketplace: 'Depo & Lojistik',
    isActive: true,
    createdAt: '2026-03-05',
    updatedAt: '2026-04-02',
    blocks: [
      {
        id: 'b-10',
        type: 'features',
        title: 'Depo ve Paketleme Masası Yetenekleri',
        subtitle: 'Günlük 1.000+ sipariş çıkaran depoların vazgeçilmez altyapısı',
        items: [
          { title: 'Reyon Bazlı Akıllı Toplama', desc: 'Depo personeline ürünlerin koridor ve raf sırasına göre optimize edilmiş toplama listesi sunulur.' },
          { title: 'Sesli & Görsel Barkod Doğrulama', desc: 'Paketleme masasında yanlış ürün okutulduğunda kırmızı uyarı ve sesli ikaz ile paketleme kilitlenir.' },
          { title: 'Otomatik Kargo ve Fatura Çıktısı', desc: 'Doğru ürünün son barkodu okutulduğu an termal yazıcıdan kargo etiketi anında çıkar.' },
          { title: 'Excel Stok Sayım Mutabakatı', desc: 'Fiziksel depo sayım listenizi sisteme yükleyin, açık ve fazla veren stokları anında raporlayın.' }
        ]
      }
    ]
  }
];

const defaultLeads: DemoLead[] = [
  {
    id: 'lead-1',
    fullName: 'Ahmet Yılmaz',
    companyName: 'Akıl Lojistik & Tekstil',
    phone: '0532 123 45 67',
    email: 'ahmet@akillojistik.com',
    monthlyOrders: '2.500 - 5.000 Sipariş',
    marketplaces: ['Trendyol', 'Hepsiburada', 'N11'],
    interestedPackage: 'Profesyonel Plan',
    notes: 'Depo paketleme masası ve Trendyol Plus komisyon analizi hakkında canlı sunum istiyor.',
    status: 'Yeni',
    createdAt: '2026-04-05 10:30'
  },
  {
    id: 'lead-2',
    fullName: 'Canan Kaya',
    companyName: 'Berrak Ev Gereçleri Ltd.',
    phone: '0544 987 65 43',
    email: 'ckaya@berrakev.com.tr',
    monthlyOrders: '1.000 - 2.500 Sipariş',
    marketplaces: ['Trendyol', 'Çiçeksepeti'],
    interestedPackage: 'Profesyonel Plan',
    notes: 'Arandı, yarın saat 14:00 için online demo randevusu belirlendi.',
    status: 'Arandı',
    createdAt: '2026-04-04 16:15'
  },
  {
    id: 'lead-3',
    fullName: 'Mehmet Aydın',
    companyName: 'Demir Yapı & Hırdavat',
    phone: '0505 555 12 34',
    email: 'mehmet@demiryapi.com',
    monthlyOrders: '5.000+ Sipariş',
    marketplaces: ['Trendyol', 'Hepsiburada', 'Pazarama', 'PTTAVM'],
    interestedPackage: 'Kurumsal / Enterprise',
    notes: 'Demo yapıldı, teklif değerlendirme aşamasında.',
    status: 'Demo Yapıldı',
    createdAt: '2026-04-03 11:00'
  }
];

const defaultMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'Selin Kurt',
    email: 'selin@kurtticaret.com',
    phone: '0533 222 33 44',
    subject: 'IKEA Entegrasyonu Hakkında',
    message: 'IKEA mağazamızdaki ürünleri Trendyol ve Hepsiburada ile otomatik eşitlemek istiyoruz. Entegrasyonunuz bunu destekliyor mu?',
    isRead: false,
    createdAt: '2026-04-06 09:15'
  }
];

const defaultSettings: SiteSettings = {
  siteTitle: 'Jeina E-Ticaret Entegrasyon Sistemleri',
  tagline: 'Sıfır Hata ve Maksimum Hız ile Çok Kanallı Satış Yönetimi',
  phone: '+90 (212) 555 01 23',
  email: 'destek@jeina.com.tr',
  address: 'Maslak Mah. Büyükdere Cad. No:123 Şişli / İstanbul',
  telegramBotToken: '',
  telegramChatId: '',
  enableTelegramNotification: false
};

export const storage = {
  // Sync with SQL API
  async getPackagesAsync(): Promise<IntegrationPackage[]> {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(PACKAGES_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {}
    return this.getPackages();
  },

  async getPagesAsync(): Promise<DynamicPage[]> {
    try {
      const res = await fetch('/api/pages');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(PAGES_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {}
    return this.getPages();
  },

  async getLeadsAsync(): Promise<DemoLead[]> {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem(LEADS_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {}
    return this.getLeads();
  },

  async getMessagesAsync(): Promise<ContactMessage[]> {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem(MESSAGES_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {}
    return this.getMessages();
  },

  getPackages(): IntegrationPackage[] {
    const raw = localStorage.getItem(PACKAGES_KEY);
    if (!raw) {
      localStorage.setItem(PACKAGES_KEY, JSON.stringify(defaultPackages));
      return defaultPackages;
    }
    return JSON.parse(raw);
  },
  savePackages(packages: IntegrationPackage[]) {
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages));
    try {
      packages.forEach(pkg => {
        fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pkg)
        }).catch(() => {});
      });
    } catch {}
  },
  deletePackage(id: string) {
    try {
      fetch(`/api/packages/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch {}
    const packages = this.getPackages().filter(p => p.id !== id);
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages));
  },
  getPages(): DynamicPage[] {
    const raw = localStorage.getItem(PAGES_KEY);
    if (!raw) {
      localStorage.setItem(PAGES_KEY, JSON.stringify(defaultPages));
      return defaultPages;
    }
    return JSON.parse(raw);
  },
  savePages(pages: DynamicPage[]) {
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
    try {
      pages.forEach(page => {
        fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(page)
        }).catch(() => {});
      });
    } catch {}
  },
  deletePage(id: string) {
    try {
      fetch(`/api/pages/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch {}
    const pages = this.getPages().filter(p => p.id !== id);
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
  },
  getPageBySlug(slug: string): DynamicPage | undefined {
    return this.getPages().find(p => p.slug === slug && p.isActive);
  },
  getLeads(): DemoLead[] {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(defaultLeads));
      return defaultLeads;
    }
    return JSON.parse(raw);
  },
  addLead(lead: Omit<DemoLead, 'id' | 'createdAt' | 'status'>): DemoLead {
    // 1. Asenkron olarak MS SQL API'sine gönder
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      }).catch(() => {});
    } catch {}

    // 2. Tarayıcıda da anında göster
    const leads = this.getLeads();
    const newLead: DemoLead = {
      ...lead,
      id: 'lead-' + Date.now(),
      status: 'Yeni',
      createdAt: new Date().toLocaleString('tr-TR')
    };
    leads.unshift(newLead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return newLead;
  },
  updateLeadStatus(id: string, status: DemoLead['status']) {
    try {
      fetch(`/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).catch(() => {});
    } catch {}

    const leads = this.getLeads();
    const target = leads.find(l => l.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    }
  },
  deleteLead(id: string) {
    try {
      fetch(`/api/leads/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch {}

    const leads = this.getLeads().filter(l => l.id !== id);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  },
  getMessages(): ContactMessage[] {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(defaultMessages));
      return defaultMessages;
    }
    return JSON.parse(raw);
  },
  addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      }).catch(() => {});
    } catch {}

    const msgs = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      isRead: false,
      createdAt: new Date().toLocaleString('tr-TR')
    };
    msgs.unshift(newMsg);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
    return newMsg;
  },
  markMessageRead(id: string) {
    try {
      fetch(`/api/contact/${id}/read`, { method: 'PUT' }).catch(() => {});
    } catch {}
    const msgs = this.getMessages();
    const target = msgs.find(m => m.id === id);
    if (target) {
      target.isRead = true;
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
    }
  },
  getSettings(): SiteSettings {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(raw);
  },
  async getSettingsAsync(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const dict = await res.json();
        const current = this.getSettings();
        const merged: SiteSettings = {
          siteTitle: dict['siteTitle'] || current.siteTitle,
          tagline: dict['tagline'] || current.tagline,
          phone: dict['phone'] || current.phone,
          email: dict['email'] || current.email,
          address: dict['address'] || current.address,
          telegramBotToken: dict['telegramBotToken'] || current.telegramBotToken,
          telegramChatId: dict['telegramChatId'] || current.telegramChatId,
          enableTelegramNotification: dict['enableTelegramNotification'] === 'true' || current.enableTelegramNotification
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
        return merged;
      }
    } catch {}
    return this.getSettings();
  },
  saveSettings(settings: SiteSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    try {
      const dict: Record<string, string> = {
        siteTitle: settings.siteTitle,
        tagline: settings.tagline,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
        telegramBotToken: settings.telegramBotToken || '',
        telegramChatId: settings.telegramChatId || '',
        enableTelegramNotification: String(settings.enableTelegramNotification)
      };
      fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dict)
      }).catch(() => {});
    } catch {}
  }
};


