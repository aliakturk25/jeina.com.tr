import React, { useState } from 'react';
import { IntegrationPackage } from '../../types';
import { storage } from '../../services/storage';

interface PackagesTabProps {
  packages: IntegrationPackage[];
  onRefresh: () => void;
}

export const PackagesTab: React.FC<PackagesTabProps> = ({ packages, onRefresh }) => {
  const [editingPkg, setEditingPkg] = useState<IntegrationPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [name, setName] = useState('');
  const [badge, setBadge] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [priceMonthly, setPriceMonthly] = useState<number>(1490);
  const [priceAnnualMonthly, setPriceAnnualMonthly] = useState<number>(1190);
  const [description, setDescription] = useState('');
  const [marketplaceCount, setMarketplaceCount] = useState('Tüm Pazaryerleri');
  const [syncSpeed, setSyncSpeed] = useState('Anlık Senkronizasyon (3.2 sn)');
  const [orderLimit, setOrderLimit] = useState('Sınırsız');
  const [warehouseModule, setWarehouseModule] = useState('Barkodlu Depo Masası');
  const [priceProtection, setPriceProtection] = useState('Fiyat Onay Kalkanı');
  const [commissionAnalysis, setCommissionAnalysis] = useState('Plus Komisyon Analitiği');
  const [supportLevel, setSupportLevel] = useState('7/24 Telefon & WhatsApp');
  const [featuresText, setFeaturesText] = useState('');

  const openEdit = (pkg: IntegrationPackage) => {
    setEditingPkg(pkg);
    setIsCreating(false);
    setName(pkg.name);
    setBadge(pkg.badge || '');
    setIsPopular(pkg.isPopular || false);
    setPriceMonthly(pkg.priceMonthly);
    setPriceAnnualMonthly(pkg.priceAnnualMonthly);
    setDescription(pkg.description);
    setMarketplaceCount(pkg.marketplaceCount);
    setSyncSpeed(pkg.syncSpeed);
    setOrderLimit(pkg.orderLimit);
    setWarehouseModule(pkg.warehouseModule);
    setPriceProtection(pkg.priceProtection);
    setCommissionAnalysis(pkg.commissionAnalysis);
    setSupportLevel(pkg.supportLevel);
    setFeaturesText(pkg.features.join('\n'));
  };

  const openNew = () => {
    setEditingPkg(null);
    setIsCreating(true);
    setName('');
    setBadge('Yeni Paket');
    setIsPopular(false);
    setPriceMonthly(1990);
    setPriceAnnualMonthly(1590);
    setDescription('Özel pazaryeri entegrasyonu ve sipariş yönetimi paketi.');
    setMarketplaceCount('3 Pazaryeri');
    setSyncSpeed('Anlık (3.2 sn)');
    setOrderLimit('2.000 Sipariş / ay');
    setWarehouseModule('Standart Toplama');
    setPriceProtection('Zarar Önleme Kalkanı');
    setCommissionAnalysis('Komisyon Analizi');
    setSupportLevel('Öncelikli Destek');
    setFeaturesText('Çift Yönlü Anlık Stok\nToplu Ürün Aktarımı\nE-Fatura Entegrasyonu');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = storage.getPackages();
    const features = featuresText.split('\n').map(s => s.trim()).filter(Boolean);

    if (isCreating) {
      const newPkg: IntegrationPackage = {
        id: 'pkg-' + Date.now(),
        name,
        badge,
        isPopular,
        priceMonthly,
        priceAnnualMonthly,
        description,
        marketplaceCount,
        syncSpeed,
        orderLimit,
        warehouseModule,
        priceProtection,
        commissionAnalysis,
        supportLevel,
        features
      };
      storage.savePackages([...currentList, newPkg]);
    } else if (editingPkg) {
      const updatedList = currentList.map(p => {
        if (p.id === editingPkg.id) {
          return {
            ...p,
            name,
            badge,
            isPopular,
            priceMonthly,
            priceAnnualMonthly,
            description,
            marketplaceCount,
            syncSpeed,
            orderLimit,
            warehouseModule,
            priceProtection,
            commissionAnalysis,
            supportLevel,
            features
          };
        }
        return p;
      });
      storage.savePackages(updatedList);
    }

    setEditingPkg(null);
    setIsCreating(false);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu paketi silmek istediğinize emin misiniz?')) {
      storage.deletePackage(id);
      onRefresh();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--border-dark)' }}>Paket ve Fiyat Yönetimi</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Tanıtım sitesindeki fiyatlandırma tablosunu düzenleyin, yeni entegrasyon paketleri ekleyin veya fiyatları güncelleyin.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          + Yeni Paket Ekle
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {packages.map(pkg => (
          <div key={pkg.id} className="sharp-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {pkg.badge && (
              <span className={`badge ${pkg.isPopular ? 'badge-primary' : ''}`} style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                {pkg.badge}
              </span>
            )}
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--border-dark)' }}>{pkg.name}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-subtle)', margin: '4px 0 14px 0' }}>{pkg.description}</p>

            <div style={{ padding: '10px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: 14 }}>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                ₺{pkg.priceMonthly.toLocaleString('tr-TR')} <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>/ ay (Aylık)</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                ₺{pkg.priceAnnualMonthly.toLocaleString('tr-TR')} / ay (Yıllık Sözleşmeli)
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div><strong>Pazaryeri:</strong> {pkg.marketplaceCount}</div>
              <div><strong>Hız:</strong> {pkg.syncSpeed}</div>
              <div><strong>Depo Masası:</strong> {pkg.warehouseModule}</div>
              <div><strong>Fiyat Kalkanı:</strong> {pkg.priceProtection}</div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" style={{ flexGrow: 1 }} onClick={() => openEdit(pkg)}>
                Düzenle
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--danger)' }}
                onClick={() => handleDelete(pkg.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {(isCreating || editingPkg) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="sharp-card" style={{ width: 680, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 14 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>
                {isCreating ? 'Yeni Entegrasyon Paketi Ekle' : `${editingPkg?.name} Düzenle`}
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => { setIsCreating(false); setEditingPkg(null); }}>
                Kapat
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Paket Adı *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rozet (Badge)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Örn: En Çok Tercih Edilen"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Aylık Fiyat (₺) *</label>
                  <input
                    type="number"
                    className="form-input"
                    required
                    value={priceMonthly}
                    onChange={(e) => setPriceMonthly(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Yıllık Ödemede Aylık Fiyat (₺) *</label>
                  <input
                    type="number"
                    className="form-input"
                    required
                    value={priceAnnualMonthly}
                    onChange={(e) => setPriceAnnualMonthly(Number(e.target.value))}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Paket Açıklaması</label>
                  <input
                    type="text"
                    className="form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pazaryeri Kapsamı Metni</label>
                  <input
                    type="text"
                    className="form-input"
                    value={marketplaceCount}
                    onChange={(e) => setMarketplaceCount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Senkronizasyon Hızı</label>
                  <input
                    type="text"
                    className="form-input"
                    value={syncSpeed}
                    onChange={(e) => setSyncSpeed(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Depo Masası Modülü</label>
                  <input
                    type="text"
                    className="form-input"
                    value={warehouseModule}
                    onChange={(e) => setWarehouseModule(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Zarar Koruma Kalkanı</label>
                  <input
                    type="text"
                    className="form-input"
                    value={priceProtection}
                    onChange={(e) => setPriceProtection(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Özellik Maddeleri (Her satıra bir özellik yazın)</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                    />
                    Bu paketi öne çıkar (Mavi Çerçeveli Popüler Rozeti)
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setIsCreating(false); setEditingPkg(null); }}>
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  Kaydet ve Vitrinde Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
