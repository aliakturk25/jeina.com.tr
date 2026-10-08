import React, { useState } from 'react';

interface HeroProps {
  onNavigate: (view: string, slug?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'latency' | 'shield' | 'packing'>('shield');

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Headline, Subtitle, Actions, Trust */}
            <div className="hero-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: 2, marginBottom: 14 }}>
                <span className="live-dot"></span>
                <span style={{ fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)', letterSpacing: '0.04em' }}>
                  CANLI API ALTYAPISI · 3.2s SENKRONİZASYON
                </span>
              </div>

              <h1 className="hero-title">
                Çok Kanallı Pazaryeri Satışında<br />
                <span className="hero-title-accent">Sıfır Hata</span> ve Anlık Hız
              </h1>

              <p className="hero-subtitle">
                Trendyol, Hepsiburada, N11, Çiçeksepeti, Pazarama ve PTTAVM operasyonlarınızı tek merkezden yönetin. 
                Barkodlu paketleme masası ve fiyat onay kalkanıyla hatalı ürün gönderimini ve fiyatlama zararlarını tamamen durdurun.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => onNavigate('demo')}>
                  Canlı Demo Talep Edin →
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('pricing')}>
                  Paket & Fiyatları Gör
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="trust-bar">
                <div className="trust-item">
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>●</span>
                  <span>ISO 27001 Güvenlik Standardı</span>
                </div>
                <div className="trust-item">
                  <span style={{ color: '#10b981', fontWeight: 800 }}>●</span>
                  <span>%99.98 API Uptime Garantisi</span>
                </div>
                <div className="trust-item">
                  <span style={{ color: 'var(--border-dark)', fontWeight: 800 }}>●</span>
                  <span>256-Bit SSL Şifreleme</span>
                </div>
                <div className="trust-item">
                  <span style={{ color: 'var(--text-muted)', fontWeight: 800 }}>●</span>
                  <span>Türkiye Lokasyon Dedicated Altyapı</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Operational Cockpit Simulator */}
            <div className="hero-right">
              <div className="cockpit-card">
                <div className="cockpit-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="live-dot"></span>
                    <span>JEINA CORE ENGINE v4.2</span>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: 11 }}>CANLI DENETİM SİSTEMİ</span>
                </div>

                <div className="cockpit-body">
                  {/* Status Grid */}
                  <div className="cockpit-status-grid">
                    <div className="cockpit-status-box">
                      <span className="mp-name">TRENDYOL</span>
                      <span className="mp-latency">12ms</span>
                    </div>
                    <div className="cockpit-status-box">
                      <span className="mp-name">HEPSİBURADA</span>
                      <span className="mp-latency">18ms</span>
                    </div>
                    <div className="cockpit-status-box">
                      <span className="mp-name">N11</span>
                      <span className="mp-latency">15ms</span>
                    </div>
                    <div className="cockpit-status-box">
                      <span className="mp-name">ÇİÇEKSEPETİ</span>
                      <span className="mp-latency">14ms</span>
                    </div>
                  </div>

                  {/* Cockpit Interactive Preview Switch */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className={`btn btn-sm ${activeTab === 'shield' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: 11, padding: '5px 10px', flex: 1 }}
                      onClick={() => setActiveTab('shield')}
                    >
                      Zarar Önleme Kalkanı
                    </button>
                    <button
                      className={`btn btn-sm ${activeTab === 'packing' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: 11, padding: '5px 10px', flex: 1 }}
                      onClick={() => setActiveTab('packing')}
                    >
                      Paketleme Masası
                    </button>
                    <button
                      className={`btn btn-sm ${activeTab === 'latency' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: 11, padding: '5px 10px', flex: 1 }}
                      onClick={() => setActiveTab('latency')}
                    >
                      3.2s Eşitleme
                    </button>
                  </div>

                  {/* Shield Content */}
                  {activeTab === 'shield' && (
                    <div className="cockpit-incident-shield">
                      <div className="cockpit-shield-head">
                        <span className="cockpit-shield-title">HATALI FİYAT & STOK KORUMASI</span>
                        <span className="cockpit-shield-badge">YAKALANDI & DURDURULDU</span>
                      </div>
                      <div className="cockpit-shield-text">
                        <strong>Ürün #84912</strong> için pazaryerine ₺1.450 yerine yanlışlıkla ₺145 gönderilmek istendi.
                        Akıllı Tolerans Kalkanı fiyat sapmasını tespit etti ve pazaryerine göndermeden yönetici onayına çekti.
                      </div>
                      <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--font-mono)', color: '#f87171' }}>
                        Tolerans Aşımı: %90 Fiyat Düşüşü · Olası Zarar Önleme: ₺13.050
                      </div>
                    </div>
                  )}

                  {/* Packing Content */}
                  {activeTab === 'packing' && (
                    <div className="cockpit-packing-box">
                      <div className="cockpit-packing-head">
                        <span className="cockpit-packing-title">BARKODLU HIZLI PAKETLEME MASASI</span>
                        <span className="cockpit-packing-badge">SIFIR HATA DOĞRULANDI</span>
                      </div>
                      <div className="cockpit-packing-text">
                        Paketlenen: <strong>1.482 / 1.482 Sipariş</strong>. Kamera ve el terminali eşleşti.
                        Barkod okutulmayan hiçbir koli için kargo etiketi basılamaz. Yanlış ürün çıkış riski sıfırlanmıştır.
                      </div>
                      <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--font-mono)', color: '#34d399' }}>
                        Ortalama Paketleme Süresi: 14 Saniye · İade Hata Oranı: %0.00
                      </div>
                    </div>
                  )}

                  {/* Latency Content */}
                  {activeTab === 'latency' && (
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 2, padding: '12px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8' }}>ANLIK ÇİFT YÖNLÜ SENKRONİZASYON</span>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#a5f3fc' }}>3.2 SANİYE DÖNGÜ</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.45 }}>
                        Trendyol'da satılan bir ürün 3.2 saniye içinde Hepsiburada, N11, Çiçeksepeti ve Pazarama mağazalarınızdan otomatik düşer. Açıkta stok kalmaz, ceza yemezsiniz.
                      </div>
                      <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--font-mono)', color: '#10b981' }}>
                        Son Güncelleme: 0.8 saniye önce · Kuyruk: 0 Bekleyen İş
                      </div>
                    </div>
                  )}

                  {/* Footnote */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#64748b', borderTop: '1px solid #1e293b', paddingTop: 10 }}>
                    <span>Desteklenen: Trendyol, HB, N11, Çiçeksepeti, IKEA</span>
                    <button
                      style={{ color: '#38bdf8', fontSize: 11, fontWeight: 700, textDecoration: 'underline' }}
                      onClick={() => onNavigate('integrations')}
                    >
                      Tüm Modülleri İncele →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="metrics-section">
        <div className="container">
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
              <div className="metric-desc">Hatalı fiyat girişleri pazaryerine gitmeden bloke edilir.</div>
            </div>

            <div className="metric-card">
              <div className="metric-val">120+ Saat</div>
              <div className="metric-label">Aylık Zaman Tasarrufu</div>
              <div className="metric-desc">Otomatik faturalama ve tek tıkla kargo barkodu basımı.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
