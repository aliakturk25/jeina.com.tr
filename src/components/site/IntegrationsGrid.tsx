import React, { useState } from 'react';

interface IntegrationsGridProps {
  onNavigate: (view: string, slug?: string) => void;
}

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'marketplace' | 'warehouse' | 'finance'>('all');

  const modules = [
    {
      id: 'mod-1',
      category: 'marketplace',
      badge: 'Pazaryeri API',
      badgeColor: 'badge-primary',
      title: 'Trendyol Çift Yönlü Entegrasyon',
      description: 'Siparişler saniyeler içinde panelinize düşer. Stok değişiklikleri tüm mağazalarınıza anında yansır, Trendyol kargo barkodları tek tıkla üretilir.',
      metaLeft: 'Anlık Çift Yönlü Senkron',
      metaRight: 'Resmi API v2.0',
      actionSlug: 'trendyol-entegrasyonu',
      highlights: ['Çift Yönlü Stok Eşitleme', 'Toplu Ürün & Varyant Açma', 'Otomatik Kargo Barkodu']
    },
    {
      id: 'mod-2',
      category: 'marketplace',
      badge: 'Pazaryeri API',
      badgeColor: 'badge-primary',
      title: 'Hepsiburada Akıllı Fiyat & Buybox',
      description: 'Buybox rekabetinde geride kalmayın. Komisyon oranına ve belirlediğiniz minimum kar marjına göre akıllı otomatik fiyatlama mekanizması devrede.',
      metaLeft: 'Dinamik Fiyat Motoru',
      metaRight: 'API Yetkili',
      actionSlug: undefined,
      highlights: ['Buybox Fiyat Takibi', 'Sipariş & Fatura Entegrasyonu', 'Otomatik Stok Rezervi']
    },
    {
      id: 'mod-3',
      category: 'marketplace',
      badge: 'Pazaryeri API',
      badgeColor: 'badge-primary',
      title: 'N11, Çiçeksepeti, Pazarama & PTTAVM',
      description: 'Tüm pazaryerlerinde tek tıkla toplu ürün, renk/beden varyantı açın. Farklı pazaryerlerine özel fiyat ve kampanya kurguları tanımlayın.',
      metaLeft: 'Toplu Katalog Aktarımı',
      metaRight: 'Çoklu Mağaza',
      actionSlug: undefined,
      highlights: ['Çok Kanallı Tek Panel', 'Özel Komisyon Baremleri', 'Toplu Fiyat Güncelleme']
    },
    {
      id: 'mod-4',
      category: 'warehouse',
      badge: 'Operasyonel Depo',
      badgeColor: 'badge-warning',
      title: 'Barkodlu Depo & Hızlı Paketleme Masası',
      description: 'Reyon bazlı rota ile sipariş toplama süresini yarıya indirin. Paketleme masasında yanlış ürün okutulduğunda sesli ve görsel ikaz ile yanlış kargo gönderimini sıfırlayın.',
      metaLeft: 'El Terminali & Barkod',
      metaRight: 'Sıfır Hata Masası',
      actionSlug: 'depo-ve-hizli-paketleme-masasi',
      highlights: ['Reyon Bazlı Akıllı Toplama', 'Barkodlu Doğrulama Masası', 'Kameralı Koli Eşleme']
    },
    {
      id: 'mod-5',
      category: 'finance',
      badge: 'Güvenlik & Risk',
      badgeColor: 'badge-danger',
      title: 'Fiyat ve Stok Uyuşmazlık Onay Kalkanı',
      description: 'Yanlışlıkla 10 TL girilen 1.000 TL’lik ürün için sistem otomatik devreye girer. Belirlediğiniz eşik dışındaki fiyat ve stok güncellemeleri yönetici onayına düşer, zarar engellenir.',
      metaLeft: 'Akıllı Onay Mekanizması',
      metaRight: 'Zarar Koruması',
      actionSlug: undefined,
      highlights: ['Tolerans Aşım Engeli', 'Yönetici Onay Havuzu', 'Otomatik Fiyat Koruma']
    },
    {
      id: 'mod-6',
      category: 'finance',
      badge: 'Finans & Analitik',
      badgeColor: 'badge-success',
      title: 'Plus Komisyon ve Net Karlılık Analitiği',
      description: 'Pazaryerinin kestiği komisyon, kargo maliyeti, kampanya katılım bedeli ve ürün maliyetini hesaplayarak her siparişte net kaç TL kar ettiğinizi tek ekranda görün.',
      metaLeft: 'Gerçek Kar Marjı',
      metaRight: 'Finans Raporu',
      actionSlug: undefined,
      highlights: ['Trendyol Plus Baremleri', 'Kargo Maliyet Hesaplayıcı', 'Net Kar / Zarar Raporu']
    },
    {
      id: 'mod-7',
      category: 'warehouse',
      badge: 'Depo & Sayım',
      badgeColor: 'badge-warning',
      title: 'Excel Mutabakat & Fiziksel Stok Sayımı',
      description: 'Fiziksel deponuzdaki el sayımı Excel listesini sisteme yükleyin; pazaryerleri ve sistem stokları arasındaki farkları tek saniyede karşılaştırın, uyuşmazlıkları giderin.',
      metaLeft: 'Fiziksel Sayım Eşleme',
      metaRight: 'Excel Import',
      actionSlug: undefined,
      highlights: ['Toplu Excel Yükleme', 'Uyuşmazlık Raporu', 'Tek Tıkla Stok Eşitleme']
    },
    {
      id: 'mod-8',
      category: 'marketplace',
      badge: 'Özel Entegrasyon',
      badgeColor: 'badge-primary',
      title: 'IKEA & Tedarikçi XML/API Feed',
      description: 'Büyük tedarikçilerin veya IKEA gibi mağazaların anlık stok ve fiyat verilerini çekin; kendi pazaryeri mağazalarınıza kar marjınızı ekleyerek otomatik servis edin.',
      metaLeft: 'Tedarikçi Feed Motoru',
      metaRight: 'Otomatik Kar Marjı',
      actionSlug: undefined,
      highlights: ['Anlık Stok Takibi', 'Otomatik Marj Ekleme', 'Katalog Otomasyonu']
    },
    {
      id: 'mod-9',
      category: 'finance',
      badge: 'Muhasebe & ERP',
      badgeColor: 'badge-success',
      title: 'ERP & E-Fatura Entegratörleri',
      description: 'Logo, Mikro, Nebim, Paraşüt ve BizimHesap gibi muhasebe yazılımlarınızla çift yönlü tam uyum. Siparişler cari hesaba otomatik işlenir, e-faturalar saniyeler içinde kesilir.',
      metaLeft: 'Muhasebe Bağlantısı',
      metaRight: 'Otomatik E-Fatura',
      actionSlug: undefined,
      highlights: ['Cari Hesap Eşleme', 'Toplu E-Fatura Kesimi', 'Vergi Dairesi Uyumu']
    }
  ];

  const filteredModules = activeCategory === 'all'
    ? modules
    : modules.filter(m => m.category === activeCategory);

  return (
    <section className="section" id="integrations">
      <div className="container">
        <div className="section-head">
          <div className="section-tag">Teknik Altyapı & Saha Gücü</div>
          <h2 className="section-title">
            Sahada Kanıtlanmış, Dayanıklı Entegrasyon Mimarisi
          </h2>
          <p className="section-desc">
            Sadece teorik bir yazılım değil; günde binlerce paket çıkaran, çoklu pazaryerinde milyonlarca liralık ciro yöneten işletmelerin gerçek saha ihtiyaçlarına göre tasarlandı.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="module-tabs">
          <button
            className={`module-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Tüm Saha Çözümleri ({modules.length})
          </button>
          <button
            className={`module-tab-btn ${activeCategory === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveCategory('marketplace')}
          >
            Pazaryeri API Kanalları (4)
          </button>
          <button
            className={`module-tab-btn ${activeCategory === 'warehouse' ? 'active' : ''}`}
            onClick={() => setActiveCategory('warehouse')}
          >
            Depo & Paketleme Masası (2)
          </button>
          <button
            className={`module-tab-btn ${activeCategory === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveCategory('finance')}
          >
            Finans, Kalkan & ERP (3)
          </button>
        </div>

        {/* Grid of Modules */}
        <div className="features-grid">
          {filteredModules.map((m, idx) => (
            <div key={m.id} className="feature-box">
              <div className="feature-top">
                <div className="feature-header">
                  <span className={`badge ${m.badgeColor}`}>{m.badge}</span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>
                    MODÜL 0{idx + 1}
                  </span>
                </div>
                <h3 className="feature-title">{m.title}</h3>
                <p className="feature-text" style={{ marginTop: 10 }}>{m.description}</p>

                {/* Highlights List (Zero checkmarks - clean bullet) */}
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {m.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-main)', fontWeight: 500 }}>
                      <span style={{ color: 'var(--primary)', fontSize: 10 }}>■</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="feature-meta">
                  <span>{m.metaLeft}</span>
                  <span>{m.metaRight}</span>
                </div>
                {m.actionSlug ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', marginTop: 14 }}
                    onClick={() => onNavigate('page', m.actionSlug)}
                  >
                    Detaylı Çözüm Sayfasını İncele →
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', marginTop: 14 }}
                    onClick={() => onNavigate('demo')}
                  >
                    Bu Modül İçin Demo İste
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
