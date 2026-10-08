import React, { useState } from 'react';

export const RoiCalculator: React.FC = () => {
  const [orders, setOrders] = useState<number>(3500);
  const [marketplaces, setMarketplaces] = useState<number>(4);
  const [avgReturnCost, setAvgReturnCost] = useState<number>(240);

  // Hesaplanmış operasyonel tasarruf metrikleri
  // E-ticarette yanlış paketleme / hatalı ürün oranı ortalama %1.8'dir. Her hatalı gönderim gidiş-dönüş kargo ve operasyon maliyetiyle ~240 TL'ye mal olur.
  const preventedErrorsMonthly = Math.round(orders * 0.018);
  const errorSavingsTL = preventedErrorsMonthly * avgReturnCost;
  
  // Manuel sipariş işleme, fatura kesme ve kargo barkodu basma süresi sipariş başına ~2.5 dakikadır.
  // Jeina ile bu süre 15 saniyeye düşer (sipariş başına 2.2 dk tasarruf).
  const timeSavedHours = Math.round((orders * 2.2) / 60);

  // Yıllık toplam net tasarruf
  const annualSavingsTL = errorSavingsTL * 12;

  return (
    <div className="roi-card">
      {/* Left Column: Interactive Inputs */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span className="badge badge-primary">Tasarruf & ROI Simülatörü</span>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>
            CANLI SİMÜLASYON
          </span>
        </div>

        <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--border-dark)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          İşletmenizin Operasyonel Kazancını ve Zaman Tasarrufunu Hesaplayın
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 24 }}>
          Aylık sipariş hacminizi ve pazar yerlerinizi girin; Jeina’nın barkodlu paketleme masası ve fiyat onay kalkanı ile ne kadar net para ve zaman kazanacağınızı anında görün.
        </p>

        {/* Slider 1: Orders */}
        <div className="slider-group">
          <div className="slider-head">
            <span style={{ color: 'var(--border-dark)' }}>Aylık Ortalama Sipariş Hacminiz:</span>
            <span className="slider-val">{orders.toLocaleString('tr-TR')} Sipariş / Ay</span>
          </div>
          <input
            type="range"
            min="300"
            max="30000"
            step="100"
            value={orders}
            onChange={(e) => setOrders(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
            <span>300 / ay</span>
            <span>10.000 / ay</span>
            <span>30.000+ / ay</span>
          </div>
        </div>

        {/* Slider 2: Marketplaces */}
        <div className="slider-group">
          <div className="slider-head">
            <span style={{ color: 'var(--border-dark)' }}>Aktif Pazaryeri Mağaza Sayınız:</span>
            <span className="slider-val">{marketplaces} Pazaryeri Kanalı</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={marketplaces}
            onChange={(e) => setMarketplaces(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
            <span>1 Kanal (Tek Mağaza)</span>
            <span>4 Kanal (Ortalama)</span>
            <span>8+ Kanal (Çoklu Satış)</span>
          </div>
        </div>

        {/* Slider 3: Return Cost */}
        <div className="slider-group" style={{ marginBottom: 0 }}>
          <div className="slider-head">
            <span style={{ color: 'var(--border-dark)' }}>Hatalı Paket Başına Ortalama Maliyet (Kargo + İade):</span>
            <span className="slider-val">₺{avgReturnCost} / Paket</span>
          </div>
          <input
            type="range"
            min="120"
            max="450"
            step="10"
            value={avgReturnCost}
            onChange={(e) => setAvgReturnCost(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
            <span>₺120 (Standart)</span>
            <span>₺240 (Ortalama)</span>
            <span>₺450 (Ağır / Desili Koli)</span>
          </div>
        </div>
      </div>

      {/* Right Column: Calculated Savings Display */}
      <div className="roi-result-box">
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 800 }}>
          AYLIK TAHMİNİ NET TASARRUF
        </span>

        <div className="roi-savings-val">
          ₺{errorSavingsTL.toLocaleString('tr-TR')}
        </div>

        <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 20 }}>
          Yılda yaklaşık <strong>₺{annualSavingsTL.toLocaleString('tr-TR')}</strong> operasyonel zarar engellenir.
        </div>

        <div style={{ padding: '16px', background: '#1e293b', borderRadius: 4, marginBottom: 20, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
            <span style={{ color: '#94a3b8' }}>Engellenen Hatalı Kargo:</span>
            <span style={{ color: '#ffffff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>~{preventedErrorsMonthly} Paket / Ay</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#94a3b8' }}>Kazanılan Personel Süresi:</span>
            <span style={{ color: '#a7f3d0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{timeSavedHours} Saat / Ay</span>
          </div>
        </div>

        <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4 }}>
          Hesaplama Türkiye e-ticaret iade kargo tarifeleri ve barkodsuz paketleme hata istatistiklerine dayanmaktadır.
        </div>
      </div>
    </div>
  );
};
