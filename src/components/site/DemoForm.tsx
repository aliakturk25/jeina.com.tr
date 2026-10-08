import React, { useState } from 'react';
import { storage } from '../../services/storage';

interface DemoFormProps {
  initialPackage?: string;
  onSubmitted?: () => void;
}

export const DemoForm: React.FC<DemoFormProps> = ({ initialPackage, onSubmitted }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [monthlyOrders, setMonthlyOrders] = useState('1.000 - 2.500 Sipariş');
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(['Trendyol', 'Hepsiburada']);
  const [interestedPackage, setInterestedPackage] = useState(initialPackage || 'Profesyonel Plan');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const availableMarketplaces = [
    'Trendyol',
    'Hepsiburada',
    'N11',
    'Çiçeksepeti',
    'Pazarama',
    'PTTAVM',
    'IKEA'
  ];

  const toggleMarketplace = (name: string) => {
    if (selectedMarketplaces.includes(name)) {
      setSelectedMarketplaces(selectedMarketplaces.filter(m => m !== name));
    } else {
      setSelectedMarketplaces([...selectedMarketplaces, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !companyName || !phone || !email) {
      alert('Lütfen zorunlu alanları (Ad Soyad, Firma, Telefon, E-posta) doldurunuz.');
      return;
    }

    storage.addLead({
      fullName,
      companyName,
      phone,
      email,
      monthlyOrders,
      marketplaces: selectedMarketplaces,
      interestedPackage,
      notes
    });

    setIsSuccess(true);
    if (onSubmitted) {
      onSubmitted();
    }
  };

  if (isSuccess) {
    return (
      <div className="form-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <span className="badge badge-success" style={{ marginBottom: 16 }}>TALEP ALINDI</span>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--border-dark)', marginBottom: 12 }}>
          Demo Talebiniz Başarıyla Kaydedildi
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto 24px auto' }}>
          Sayın <strong>{fullName}</strong>, <strong>{companyName}</strong> firması adına oluşturduğunuz talep yönetim panelimize aktarılmıştır.
          Ekiplerimiz 15 dakika içerisinde telefon numaranız ({phone}) üzerinden sizinle iletişime geçecektir.
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setIsSuccess(false);
            setFullName('');
            setCompanyName('');
            setPhone('');
            setEmail('');
            setNotes('');
          }}
        >
          Yeni Talep Formu Aç
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div style={{ marginBottom: 20 }}>
        <span className="badge badge-primary" style={{ marginBottom: 8 }}>Canlı Tanıtım & Teklif</span>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--border-dark)' }}>
          15 Dakikalık Canlı Demo Randevusu Alın
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Mevcut pazaryeri mağazalarınızı ve deponuzu Jeina panelinde canlı ortamda test edin.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Yetkili Adı Soyadı *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Örn: Ahmet Yılmaz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Şirket / Marka Ünvanı *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Örn: Akıl Lojistik A.Ş."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefon Numarası *</label>
            <input
              type="tel"
              className="form-input"
              required
              placeholder="05XX XXX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kurumsal E-posta Adresi *</label>
            <input
              type="email"
              className="form-input"
              required
              placeholder="ahmet@firma.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Aylık Ortalama Sipariş Hacmi</label>
            <select
              className="form-input"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(e.target.value)}
            >
              <option value="500 Sipariş Altı">500 Sipariş Altı</option>
              <option value="500 - 1.000 Sipariş">500 - 1.000 Sipariş</option>
              <option value="1.000 - 2.500 Sipariş">1.000 - 2.500 Sipariş</option>
              <option value="2.500 - 5.000 Sipariş">2.500 - 5.000 Sipariş</option>
              <option value="5.000+ Sipariş (Kurumsal)">5.000+ Sipariş (Kurumsal)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">İlgilendiğiniz Paket</label>
            <select
              className="form-input"
              value={interestedPackage}
              onChange={(e) => setInterestedPackage(e.target.value)}
            >
              <option value="Başlangıç Planı">Başlangıç Planı</option>
              <option value="Profesyonel Plan">Profesyonel Plan (Önerilen)</option>
              <option value="Kurumsal / Enterprise">Kurumsal / Enterprise</option>
            </select>
          </div>

          <div className="form-group full">
            <label className="form-label">Kullandığınız / Entegre Edilecek Pazaryerleri</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {availableMarketplaces.map((mp) => {
                const isSelected = selectedMarketplaces.includes(mp);
                return (
                  <button
                    key={mp}
                    type="button"
                    onClick={() => toggleMarketplace(mp)}
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 2,
                      border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-strong)',
                      backgroundColor: isSelected ? 'var(--primary-light)' : '#ffffff',
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {mp}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group full">
            <label className="form-label">Ek Not veya Öncelikli İhtiyaçlarınız</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Örn: Barkodlu paketleme masası ve Trendyol Plus komisyon analizi hakkında detaylı bilgi istiyoruz."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Canlı Demo Randevusu Oluştur
          </button>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', textAlign: 'center', marginTop: 10 }}>
            Bilgileriniz KVKK kapsamında gizli tutulur ve yalnızca demo organizasyonu için kullanılır.
          </div>
        </div>
      </form>
    </div>
  );
};
