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
        <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
          <div className="section-tag">Şeffaf Fiyatlandırma</div>
          <h2 className="section-title">
            İşletmenizin Ölçeğine Uygun Kurumsal Entegrasyon Paketleri
          </h2>
          <p className="section-desc">
            Gizli maliyet veya sürpriz faturalandırma yok. İhtiyacınız olan modülleri seçin, hemen kullanmaya başlayın.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 24, padding: '4px 6px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 4 }}>
            <button
              className={`btn btn-sm ${!isAnnual ? 'btn-dark' : ''}`}
              style={{ borderRadius: 2 }}
              onClick={() => setIsAnnual(false)}
            >
              Aylık Ödeme
            </button>
            <button
              className={`btn btn-sm ${isAnnual ? 'btn-primary' : ''}`}
              style={{ borderRadius: 2 }}
              onClick={() => setIsAnnual(true)}
            >
              Yıllık Ödeme (%20 İndirimli)
            </button>
          </div>
        </div>

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
                    <span className="plan-period">/ ay {isAnnual ? '(Yıllık faturalanır)' : ''}</span>
                  </div>
                </div>

                <div className="plan-specs">
                  <div className="spec-row">
                    <span className="spec-label">Pazaryeri Kapsamı:</span>
                    <span className="spec-val">{pkg.marketplaceCount}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Eşitleme Hızı:</span>
                    <span className="spec-val">{pkg.syncSpeed}</span>
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

                <ul className="plan-features-list">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item">
                      <span className="feature-bullet">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-dark'} btn-lg`}
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => onSelectPackage(pkg.name)}
                >
                  {pkg.name} İçin Demo İste
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
