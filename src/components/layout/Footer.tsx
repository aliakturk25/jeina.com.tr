import React from 'react';

interface FooterProps {
  onNavigate: (view: string, slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo-brand" style={{ marginBottom: 12 }}>JEINA</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 360 }}>
              Pazaryeri satışlarınızı, depo toplama ve paketleme süreçlerinizi sıfır hata ve anlık çift yönlü senkronizasyonla yöneten kurumsal e-ticaret altyapısı.
            </p>
            <div style={{ marginTop: 20 }}>
              <span className="badge badge-primary">Kurumsal B2B Entegrasyon</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Pazaryerleri</h4>
            <ul className="footer-links">
              <li><a href="#trendyol" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('page', 'trendyol-entegrasyonu'); }}>Trendyol Entegrasyonu</a></li>
              <li><a href="#hepsiburada" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>Hepsiburada API</a></li>
              <li><a href="#n11" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>N11 & Pazarama</a></li>
              <li><a href="#ciceksepeti" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>Çiçeksepeti & PTTAVM</a></li>
              <li><a href="#ikea" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>IKEA Katalog Feed</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Saha Modülleri</h4>
            <ul className="footer-links">
              <li><a href="#depo" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('page', 'depo-ve-hizli-paketleme-masasi'); }}>Barkodlu Paketleme Masası</a></li>
              <li><a href="#kalkan" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>Fiyat & Stok Onay Kalkanı</a></li>
              <li><a href="#komisyon" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>Plus Komisyon Analitiği</a></li>
              <li><a href="#mutabakat" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }}>Excel Stok Mutabakatı</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Kurumsal</h4>
            <ul className="footer-links">
              <li><button className="footer-link" onClick={() => onNavigate('pricing')}>Paketler ve Fiyatlar</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('demo')}>Demo ve ROI Analizi</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('contact')}>İletişim & Teklif</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('admin')}>CMS Yönetim Girişi</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Jeina E-Ticaret Entegrasyon Sistemleri A.Ş. Tüm hakları saklıdır.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>KVKK Aydınlatma Metni</span>
            <span>Hizmet Şartları</span>
            <span>SLA Garantisi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
