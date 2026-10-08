import React from 'react';
import { DynamicPage } from '../../types';
import { DemoForm } from './DemoForm';

interface DynamicPageRendererProps {
  page: DynamicPage;
  onNavigate: (view: string, slug?: string) => void;
}

export const DynamicPageRenderer: React.FC<DynamicPageRendererProps> = ({ page, onNavigate }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="hero-section" style={{ padding: '60px 0 50px 0' }}>
        <div className="container">
          <div className="hero-content">
            {page.heroBadge && (
              <span className="badge badge-primary">{page.heroBadge}</span>
            )}
            <h1 className="hero-title" style={{ fontSize: 38 }}>
              {page.heroTitle}
            </h1>
            <p className="hero-subtitle">
              {page.heroSubtitle}
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => onNavigate('demo')}>
                Bu Paket İçin Demo Talep Et
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate('pricing')}>
                Tüm Fiyatları Gör
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Blocks */}
      {page.blocks.map((block) => {
        if (block.type === 'features' && block.items) {
          return (
            <section key={block.id} className="section">
              <div className="container">
                <div className="section-head">
                  <div className="section-tag">Özellikler & Çözümler</div>
                  <h2 className="section-title">{block.title || 'Modül Detayları'}</h2>
                  {block.subtitle && <p className="section-desc">{block.subtitle}</p>}
                </div>

                <div className="features-grid">
                  {block.items.map((item, idx) => (
                    <div key={idx} className="feature-box">
                      <div className="feature-top">
                        <div className="feature-header">
                          <span className="badge">Özellik 0{idx + 1}</span>
                        </div>
                        <h3 className="feature-title">{item.title}</h3>
                        <p className="feature-text" style={{ marginTop: 10 }}>{item.desc}</p>
                      </div>
                      <div className="feature-meta">
                        <span>Aktif Saha Modülü</span>
                        <span>{page.targetMarketplace || 'Entegrasyon'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (block.type === 'faq' && block.items) {
          return (
            <section key={block.id} className="section section-alt">
              <div className="container">
                <div className="section-head" style={{ maxWidth: 760 }}>
                  <div className="section-tag">Merak Edilenler</div>
                  <h2 className="section-title">{block.title || 'Sıkça Sorulan Sorular'}</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 840 }}>
                  {block.items.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-color)',
                        padding: '20px 24px',
                        borderRadius: 2
                      }}
                    >
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--border-dark)', marginBottom: 8 }}>
                        {faq.title}
                      </h4>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        {faq.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}

      {/* Embedded Form Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 36px auto' }}>
            <div className="section-tag">Hemen Başlayın</div>
            <h2 className="section-title">{page.title} Canlı Sunumu</h2>
            <p className="section-desc">
              Uzman ekibimiz 15 dakika içinde mağazanıza özel kurulum planını hazırlasın.
            </p>
          </div>
          <DemoForm initialPackage={page.title} />
        </div>
      </section>
    </div>
  );
};
