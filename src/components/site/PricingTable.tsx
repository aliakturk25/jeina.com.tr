import React, { useState } from 'react';
import { IntegrationPackage } from '../../types';

interface PricingTableProps {
  packages: IntegrationPackage[];
  onSelectPackage: (packageName: string) => void;
}

export const PricingTable: React.FC<PricingTableProps> = ({ packages, onSelectPackage }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="section section-alt" id="pricing">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 44px auto' }}>
          <div className="section-tag">Şeffaf & Taahhütsüz Fiyatlandırma</div>
          <h2 className="section-title">
            İşletmenizin Operasyon Ölçeğine Uygun Kurumsal Paketler
          </h2>
          <p className="section-desc">
            Gizli maliyet veya sürpriz faturalandırma yok. İhtiyacınız olan modülleri seçin, hemen kurun ve satışa başlayın.
          </p>

          {/* Billing Switch */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 24, padding: '5px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 4, boxShadow: 'var(--shadow-sm)' }}>
            <button
              className={`btn btn-sm ${!isAnnual ? 'btn-dark' : 'btn-secondary'}`}
              style={{ border: 'none', borderRadius: 2 }}
              onClick={() => setIsAnnual(false)}
            >
              Aylık Faturalama
            </button>
            <button
              className={`btn btn-sm ${isAnnual ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              onClick={() => setIsAnnual(true)}
            >
              <span>Yıllık Faturalama</span>
              <span style={{ fontSize: 10, background: '#10b981', color: '#ffffff', padding: '1px 6px', borderRadius: 2, fontWeight: 800 }}>
                %20 TASARRUF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {packages.map((pkg) => {
            const price = isAnnual ? pkg.priceAnnualMonthly : pkg.priceMonthly;

            return (
              <div
                key={pkg.id}
                className={`pricing-card ${pkg.isPopular ? 'popular' : ''}`}
              >
                {pkg.badge && (
                  <div style={{ marginBottom: 12 }}>
                    <span className={`badge ${pkg.isPopular ? 'badge-primary' : ''}`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="pricing-header">
                  <h3 className="plan-name">{pkg.name}</h3>
                  <p className="plan-desc">{pkg.description}</p>
                  
                  <div className="plan-price-wrap">
                    <span className="plan-price">₺{price.toLocaleString('tr-TR')}</span>
                    <span className="plan-period">/ ay {isAnnual ? '(Yıllık Peşin)' : ''}</span>
                  </div>
                </div>

                <div className="plan-specs">
                  <div className="spec-row">
                    <span className="spec-label">Pazaryeri Kapsamı:</span>
                    <span className="spec-val">{pkg.marketplaceCount}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Eşitleme Hızı:</span>
                    <span className="spec-val" style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{pkg.syncSpeed}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Sipariş Kotası:</span>
                    <span className="spec-val">{pkg.orderLimit}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Depo Masası:</span>
                    <span className="spec-val">{pkg.warehouseModule}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Zarar Koruma Kalkanı:</span>
                    <span className="spec-val">{pkg.priceProtection}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Karlılık Analizi:</span>
                    <span className="spec-val">{pkg.commissionAnalysis}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Teknik Destek:</span>
                    <span className="spec-val">{pkg.supportLevel}</span>
                  </div>
                </div>

                {/* Features (Zero checkmarks, compliant square bullet) */}
                <ul className="plan-features-list">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item">
                      <span className="feature-bullet" style={{ color: pkg.isPopular ? 'var(--primary)' : 'var(--text-subtle)' }}>■</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-dark'} btn-lg`}
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => onSelectPackage(pkg.name)}
                >
                  {pkg.name} İçin Demo İste →
                </button>
              </div>
            );
          })}
        </div>

        {/* Enterprise SLA Guarantee Banner */}
        <div style={{ marginTop: 40, padding: '20px 28px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--border-dark)' }}>Özel ERP Entegrasyonu veya Çoklu Depo İhtiyacınız mı Var?</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Büyük hacimli e-ticaret markaları için yerinde kurulum, dedike sunucu kuyruğu ve 7/24 telefon SLA desteği sunuyoruz.</div>
          </div>
          <button className="btn btn-secondary" onClick={() => onSelectPackage('Özel Kurumsal ERP')}>
            Kurumsal Ekiple Görüşün →
          </button>
        </div>
      </div>
    </section>
  );
};
