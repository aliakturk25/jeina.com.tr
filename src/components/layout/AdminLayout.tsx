import React from 'react';
import { DemoLead } from '../../types';

interface AdminLayoutProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onExitAdmin: () => void;
  onLogout: () => void;
  leads: DemoLead[];
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onExitAdmin,
  onLogout,
  leads,
  children
}) => {
  const newLeadsCount = leads.filter(l => l.status === 'Yeni').length;

  const menuItems = [
    { key: 'dashboard', label: 'Gösterge Paneli', count: 0 },
    { key: 'leads', label: 'Demo Talepleri (CRM)', count: newLeadsCount },
    { key: 'packages', label: 'Paket & Fiyat Yönetimi', count: 0 },
    { key: 'pages', label: 'Dinamik Sayfa Oluşturucu', count: 0 },
    { key: 'messages', label: 'İletişim Mesajları', count: 0 },
    { key: 'settings', label: 'Site & Bildirim Ayarları', count: 0 }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>JEINA</span>
            <span style={{ fontSize: 10, background: '#1e293b', color: '#94a3b8', padding: '2px 6px', borderRadius: 2, fontWeight: 700 }}>CMS</span>
          </div>
        </div>

        <nav className="admin-nav">
          {menuItems.map(item => (
            <div
              key={item.key}
              className={`admin-nav-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => onSelectTab(item.key)}
            >
              <span>{item.label}</span>
              {item.count > 0 && (
                <span className="badge badge-primary" style={{ backgroundColor: '#2563eb', color: '#ffffff', borderColor: '#3b82f6' }}>
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ padding: 16, borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', color: '#ffffff', backgroundColor: '#1e293b', borderColor: '#334155' }}
            onClick={onExitAdmin}
          >
            ← Vitrin Sitesine Dön
          </button>
          <button
            className="btn btn-sm"
            style={{ width: '100%', color: '#f87171', backgroundColor: '#1e293b', borderColor: '#7f1d1d' }}
            onClick={onLogout}
          >
            Güvenli Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>
              {menuItems.find(m => m.key === activeTab)?.label}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>
              Yönetici: <strong>Jeina Web Admin</strong>
            </span>
            <button className="btn btn-secondary btn-sm" onClick={onExitAdmin}>
              Canlı Siteyi Gör
            </button>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};
