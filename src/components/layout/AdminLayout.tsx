import React from 'react';
import { DemoLead } from '../../types';

interface AdminLayoutProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onExitAdmin: () => void;
  leads: DemoLead[];
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onExitAdmin,
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
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>JEINA</span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Web CMS</span>
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

        <div style={{ padding: 16, borderTop: '1px solid #1e293b' }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', color: '#ffffff', backgroundColor: '#1e293b', borderColor: '#334155' }}
            onClick={onExitAdmin}
          >
            ← Vitrin Sitesine Dön
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
