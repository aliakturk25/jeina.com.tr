import React from 'react';

interface IntegrationsGridProps {
  onNavigate: (view: string, slug?: string) => void;
}

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({ onNavigate }) => {
  const modules = [
    {
      badge: 'Pazaryeri API',
      title: 'Trendyol Çift Yönlü Entegrasyon',
      description: 'Siparişler saniyeler içinde panelinize düşer. Stok değişiklikleri tüm mağazalarınıza anında yansır, Trendyol kargo barkodları otomatik üretilir.',
      metaLeft: 'Anlık Çift Yönlü Senkron',
      metaRight: 'API v2.0',
      actionSlug: 'trendyol-entegrasyonu'
    },
    {
      badge: 'Pazaryeri API',
      title: 'Hepsiburada Akıllı Fiyat & Buybox',
      description: 'Buybox rekabetinde geride kalmayın. Komisyon oranına ve belirlediğiniz minimum kar marjına göre akıllı otomatik fiyatlama mekanizması.',
      metaLeft: 'Dinamik Fiyat Motoru',
      metaRight: 'API Yetkili',
      actionSlug: undefined
    },
    {
      badge: 'Pazaryeri API',
      title: 'N11, Çiçeksepeti, Pazarama & PTTAVM',
      description: 'Tüm pazaryerlerinde tek tıkla toplu ürün, renk/beden varyantı açın. Farklı pazaryerlerine özel fiyat ve kampanya kurguları tanımlayın.',
      metaLeft: 'Toplu Katalog Aktarımı',
      metaRight: 'Çoklu Mağaza',
      actionSlug: undefined
    },
    {
      badge: 'Operasyonel Depo',
      title: 'Barkodlu Depo & Hızlı Paketleme Masası',
      description: 'Reyon bazlı rota ile sipariş toplama süresini yarıya indirin. Paketleme masasında yanlış ürün okutulduğunda sesli ve görsel ikaz ile yanlış kargo gönderimini sıfırlayın.',
      metaLeft: 'El Terminali & Barkod',
      metaRight: 'Sıfır Hata Masası',
      actionSlug: 'depo-ve-hizli-paketleme-masasi'
    },
    {
      badge: 'Güvenlik & Risk',
      title: 'Fiyat ve Stok Uyuşmazlık Kalkanı',
      description: 'Yanlışlıkla 10 TL girilen 1.000 TL’lik ürün için sistem otomatik devreye girer. Belirlediğiniz eşik dışındaki fiyat ve stok güncellemeleri yönetici onayına düşer, zarar engellenir.',
      metaLeft: 'Akıllı Onay Mekanizması',
      metaRight: 'Zarar Koruması',
      actionSlug: undefined
    },
    {
      badge: 'Finans & Analitik',
      title: 'Plus Komisyon ve Net Karlılık Analitiği',
      description: 'Pazaryerinin kestiği komisyon, kargo maliyeti, kampanya katılım bedeli ve ürün maliyetini hesaplayarak her siparişte net kaç TL kar ettiğinizi tek ekranda görün.',
      metaLeft: 'Gerçek Kar Marjı',
      metaRight: 'Finans Raporu',
      actionSlug: undefined
    }
  ];

  return (
    <section className="section" id="integrations">
      <div className="container">
        <div className="section-head">
          <div className="section-tag">Teknik Altyapı & Saha Gücü</div>
          <h2 className="section-title">
            Sahada Test Edilmiş, Dayanıklı Entegrasyon Modülleri
          </h2>
          <p className="section-desc">
            Sadece teorik bir yazılım değil; günde binlerce paket çıkaran, çoklu pazaryerinde milyonlarca liralık ciro yöneten işletmelerin gerçek saha ihtiyaçlarına göre tasarlandı.
          </p>
        </div>

        <div className="features-grid">
          {modules.map((m, idx) => (
            <div key={idx} className="feature-box">
              <div className="feature-top">
                <div className="feature-header">
                  <span className="badge">{m.badge}</span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>
                    MODÜL 0{idx + 1}
                  </span>
                </div>
                <h3 className="feature-title">{m.title}</h3>
                <p className="feature-text" style={{ marginTop: 10 }}>{m.description}</p>
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
                    Detaylı Çözüm Sayfasını İncele
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
