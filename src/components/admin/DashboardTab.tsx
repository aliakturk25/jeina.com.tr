import React from 'react';
import { DemoLead, IntegrationPackage, DynamicPage, ContactMessage } from '../../types';

interface DashboardTabProps {
  leads: DemoLead[];
  packages: IntegrationPackage[];
  pages: DynamicPage[];
  messages: ContactMessage[];
  onSelectTab: (tab: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  leads,
  packages,
  pages,
  messages,
  onSelectTab
}) => {
  const newLeadsCount = leads.filter(l => l.status === 'Yeni').length;
  const demoDoneCount = leads.filter(l => l.status === 'Demo Yapıldı' || l.status === 'Satışa Döndü').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--border-dark)' }}>CMS Gösterge Paneli</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Tanıtım sitesi performansı, gelen demo talepleri ve vitrin içeriği genel bakışı.
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => onSelectTab('pages')}>
          + Yeni Entegrasyon Sayfası Aç
        </button>
      </div>

      {/* Compact KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <div className="sharp-card" style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: 4 }} onClick={() => onSelectTab('leads')}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>BEKLEYEN YENİ DEMO</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {newLeadsCount}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Toplam {leads.length} demo talebinden</div>
        </div>

        <div className="sharp-card" style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: 4 }} onClick={() => onSelectTab('leads')}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>TAMAMLANAN DEMO</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--success)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {demoDoneCount}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Demo yapıldı veya satışa döndü</div>
        </div>

        <div className="sharp-card" style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: 4 }} onClick={() => onSelectTab('packages')}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>YAYINDAKİ PAKETLER</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--border-dark)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {packages.length}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Fiyatlandırma sayfasında aktif</div>
        </div>

        <div className="sharp-card" style={{ padding: '14px 18px', cursor: 'pointer', borderRadius: 4 }} onClick={() => onSelectTab('pages')}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>DİNAMİK SAYFALAR</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--border-dark)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {pages.length}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Özel paket & landing sayfaları</div>
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="sharp-card" style={{ padding: 0, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--border-dark)' }}>Son Gelen Demo Talepleri</h3>
            <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>İncelemek veya durum güncellemek için satıra tıklayın</span>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ padding: '5px 10px', fontSize: 12 }} onClick={() => onSelectTab('leads')}>
            Tüm Talepleri Gör ({leads.length})
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Firma Adı</th>
              <th>İletişim Kişisi</th>
              <th>Telefon</th>
              <th>Hacim</th>
              <th>Paket</th>
              <th>Tarih</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {leads.slice(0, 5).map(lead => (
              <tr key={lead.id}>
                <td style={{ fontWeight: 700 }}>{lead.companyName}</td>
                <td>{lead.fullName}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{lead.phone}</td>
                <td>{lead.monthlyOrders}</td>
                <td>{lead.interestedPackage || '-'}</td>
                <td style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{lead.createdAt}</td>
                <td>
                  <span className={`badge ${lead.status === 'Yeni' ? 'badge-primary' : lead.status === 'Demo Yapıldı' ? 'badge-success' : 'badge-warning'}`}>
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
