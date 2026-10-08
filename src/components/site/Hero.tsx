import React from 'react';

interface HeroProps {
  onNavigate: (view: string, slug?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <span className="badge badge-primary">Çift Yönlü Resmi Pazaryeri API Entegrasyonu</span>
          
          <h1 className="hero-title">
            E-Ticaret Operasyonunda<br />Sıfır Hata ve Maksimum Hız
          </h1>
          
          <p className="hero-subtitle">
            Trendyol, Hepsiburada, N11, Çiçeksepeti ve Pazarama mağazalarınızı tek panelden yönetin.
            Barkod okuyuculu depo masası ve uyuşmazlık onay kalkanı ile yanlış ürün gönderimini ve fiyat hatalarını tamamen durdurun.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('demo')}>
              Canlı Demo Talep Et
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('integrations')}>
              Saha Modüllerini İncele
            </button>
          </div>

          <div className="marketplaces-strip">
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
              Desteklenen Kanallar:
            </span>
            <span className="mp-item">TRENDYOL</span>
            <span className="mp-item">HEPSİBURADA</span>
            <span className="mp-item">N11</span>
            <span className="mp-item">ÇİÇEKSEPETİ</span>
            <span className="mp-item">PAZARAMA</span>
            <span className="mp-item">PTTAVM</span>
            <span className="mp-item">IKEA</span>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-val">3.2 sn</div>
              <div className="metric-label">Anlık Eşitleme Hızı</div>
              <div className="metric-desc">Tüm pazaryerlerinde stok ve fiyat aynı anda güncellenir.</div>
            </div>

            <div className="metric-card">
              <div className="metric-val">0 Adet</div>
              <div className="metric-label">Hatalı Kargo Çıkışı</div>
              <div className="metric-desc">Barkod okutulmadan kargo etiketi basılmaz.</div>
            </div>

            <div className="metric-card">
              <div className="metric-val">%100</div>
              <div className="metric-label">Fiyat Koruma Kalkanı</div>
              <div className="metric-desc">Hatalı fiyat girişleri anında bloke edilir.</div>
            </div>

            <div className="metric-card">
              <div className="metric-val">120 Saat</div>
              <div className="metric-label">Aylık Zaman Tasarrufu</div>
              <div className="metric-desc">Otomatik faturalama ve tek tıkla kargo barkodu basımı.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
