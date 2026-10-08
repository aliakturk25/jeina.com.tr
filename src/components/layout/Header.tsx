import React from 'react';
import { DynamicPage } from '../../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, slug?: string) => void;
  pages: DynamicPage[];
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, pages }) => {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo-area" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          <span className="logo-brand">JEINA</span>
          <span className="logo-tag">
            E-Ticaret Entegrasyon<br />Sistemleri
          </span>
        </div>

        <ul className="nav-links">
          <li>
            <button
              className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
            >
              Ana Sayfa
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentView === 'integrations' ? 'active' : ''}`}
              onClick={() => onNavigate('integrations')}
            >
              Entegrasyonlar
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentView === 'pricing' ? 'active' : ''}`}
              onClick={() => onNavigate('pricing')}
            >
              Paketler & Fiyatlar
            </button>
          </li>
          {pages.filter(p => p.isActive).map(page => (
            <li key={page.id}>
              <button
                className={`nav-link ${currentView === `page-${page.slug}` ? 'active' : ''}`}
                onClick={() => onNavigate('page', page.slug)}
              >
                {page.title.split(' ')[0]} Paketi
              </button>
            </li>
          ))}
          <li>
            <button
              className={`nav-link ${currentView === 'demo' ? 'active' : ''}`}
              onClick={() => onNavigate('demo')}
            >
              Demo & Tasarruf
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
              onClick={() => onNavigate('contact')}
            >
              İletişim
            </button>
          </li>
        </ul>

        <div className="header-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('admin')}
            title="Sadece tanıtım sitesi vitrinini yönetebileceğiniz CMS panel"
          >
            CMS Paneli
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('demo')}
          >
            Demo Talep Et
          </button>
        </div>
      </div>
    </header>
  );
};
