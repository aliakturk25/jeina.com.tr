import React, { useState } from 'react';

export const RoiCalculator: React.FC = () => {
  const [orders, setOrders] = useState<number>(3500);
  const [marketplaces, setMarketplaces] = useState<number>(4);

  // Hesaplanmış operasyonel tasarruf metrikleri
  // E-ticarette yanlış paketleme oranı ortalama %1.5'tir. Her hatalı gönderim iade kargo ve operasyon maliyetiyle ~180 TL'ye mal olur.
  const preventedErrorsMonthly = Math.round(orders * 0.018);
  const errorSavingsTL = preventedErrorsMonthly * 210;
  
  // Manuel sipariş işleme, fatura kesme ve kargo barkodu basma süresi sipariş başına ~2.5 dakikadır.
  // Jeina ile bu süre 15 saniyeye düşer.
  const timeSavedHours = Math.round((orders * 2.2) / 60);

  return (
    <div className="roi-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="badge badge-primary">Tasarruf & ROI Simülatörü</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-subtle)' }}>CANLI HESAPLAMA</span>
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--border-dark)', marginBottom: 8 }}>
        İşletmenizin Operasyonel Kazancını Hesaplayın
      </h3>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 20 }}>
        Aylık sipariş hacminizi ve kullandığınız pazaryeri sayısını girin; Jeina’nın barkodlu masası ve uyuşmazlık kalkanı ile ne kadar tasarruf edeceğinizi görün.
      </p>

      <div className="slider-group">
        <div className="slider-labels">
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>Aylık Ortalama Sipariş Adedi:</span>
          <span className="slider-val">{orders.toLocaleString('tr-TR')} Sipariş</span>
        </div>
        <input
          type="range"
          min="300"
          max="25000"
          step="100"
          value={orders}
          onChange={(e) => setOrders(Number(e.target.value))}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
          <span>300 / ay</span>
          <span>10.000 / ay</span>
          <span>25.000+ / ay</span>
        </div>
      </div>

      <div className="slider-group">
        <div className="slider-labels">
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>Aktif Pazaryeri Sayınız:</span>
          <span className="slider-val">{marketplaces} Kanal</span>
        </div>
        <input
          type="range"
          min="1"
          max="7"
          step="1"
          value={marketplaces}
          onChange={(e) => setMarketplaces(Number(e.target.value))}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
          <span>1 Kanal</span>
          <span>4 Kanal</span>
          <span>7 Kanal (Tümü)</span>
        </div>
      </div>

      <div className="roi-results-box">
        <div>
          <div className="roi-stat-num">₺{errorSavingsTL.toLocaleString('tr-TR')}</div>
          <div className="roi-stat-desc">Aylık Tahmini Hata & Ceza Tasarrufu</div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
            Ayda engellenen ~{preventedErrorsMonthly} adet hatalı kargo masrafı.
          </div>
        </div>

        <div>
          <div className="roi-stat-num">{timeSavedHours} Saat</div>
          <div className="roi-stat-desc">Aylık Personel Zaman Kazancı</div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
            Otomatik seri kargo barkodu ve e-fatura ile kazanılan süre.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: 12, color: 'var(--text-muted)' }}>
        Bu veriler Türkiye e-ticaret satıcılarının ortalama kargo iade masrafları ve sevk süreleri baz alınarak hesaplanmıştır.
      </div>
    </div>
  );
};
