import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { Hero } from './components/site/Hero';
import { IntegrationsGrid } from './components/site/IntegrationsGrid';
import { PricingTable } from './components/site/PricingTable';
import { RoiCalculator } from './components/site/RoiCalculator';
import { DemoForm } from './components/site/DemoForm';
import { ContactSection } from './components/site/ContactSection';
import { DynamicPageRenderer } from './components/site/DynamicPageRenderer';

import { DashboardTab } from './components/admin/DashboardTab';
import { LeadsTab } from './components/admin/LeadsTab';
import { PackagesTab } from './components/admin/PackagesTab';
import { PagesTab } from './components/admin/PagesTab';
import { MessagesTab } from './components/admin/MessagesTab';
import { SettingsTab } from './components/admin/SettingsTab';
import { AdminLogin } from './components/admin/AdminLogin';

import { storage } from './services/storage';
import { IntegrationPackage, DynamicPage, DemoLead, ContactMessage, SiteSettings } from './types';

export const App: React.FC = () => {
  const isInitialAdmin = () => {
    return (
      window.location.pathname.startsWith('/jeina') ||
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.includes('jeina') ||
      window.location.hash.includes('admin') ||
      window.location.search.includes('jeina') ||
      window.location.search.includes('admin') ||
      localStorage.getItem('jeina_active_view') === 'admin'
    );
  };

  const [view, setView] = useState<'home' | 'integrations' | 'pricing' | 'demo' | 'contact' | 'page' | 'admin'>(
    isInitialAdmin() ? 'admin' : 'home'
  );
  const [activeSlug, setActiveSlug] = useState<string | undefined>();
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [selectedPackageForDemo, setSelectedPackageForDemo] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('jeina_admin_auth') === 'true';
  });

  const [packages, setPackages] = useState<IntegrationPackage[]>([]);
  const [pages, setPages] = useState<DynamicPage[]>([]);
  const [leads, setLeads] = useState<DemoLead[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(storage.getSettings());

  const refreshData = async () => {
    setPackages(await storage.getPackagesAsync());
    setPages(await storage.getPagesAsync());
    setLeads(await storage.getLeadsAsync());
    setMessages(await storage.getMessagesAsync());
    setSettings(storage.getSettings());
  };

  useEffect(() => {
    refreshData();
    localStorage.removeItem('jeina_active_view');
  }, []);

  const handleNavigate = (newView: string, slug?: string) => {
    if (newView === 'page' && slug) {
      setView('page');
      setActiveSlug(slug);
      window.history.pushState(null, '', `/paketler/${slug}`);
    } else if (newView === 'admin') {
      setView('admin');
      window.history.pushState(null, '', '/jeina');
    } else {
      setView(newView as any);
      setActiveSlug(undefined);
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('jeina_admin_auth');
    setIsAuthenticated(false);
    setView('home');
    window.history.pushState(null, '', '/');
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackageForDemo(packageName);
    setView('demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin View
  if (view === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAuthenticated(true)}
          onCancel={() => setView('home')}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={adminTab}
        onSelectTab={setAdminTab}
        onExitAdmin={() => setView('home')}
        onLogout={handleLogout}
        leads={leads}
      >
        {adminTab === 'dashboard' && (
          <DashboardTab
            leads={leads}
            packages={packages}
            pages={pages}
            messages={messages}
            onSelectTab={setAdminTab}
          />
        )}
        {adminTab === 'leads' && (
          <LeadsTab leads={leads} onRefresh={refreshData} />
        )}
        {adminTab === 'packages' && (
          <PackagesTab packages={packages} onRefresh={refreshData} />
        )}
        {adminTab === 'pages' && (
          <PagesTab
            pages={pages}
            onRefresh={refreshData}
            onPreviewPage={(slug) => handleNavigate('page', slug)}
          />
        )}
        {adminTab === 'messages' && (
          <MessagesTab messages={messages} onRefresh={refreshData} />
        )}
        {adminTab === 'settings' && (
          <SettingsTab settings={settings} onRefresh={refreshData} />
        )}
      </AdminLayout>
    );
  }

  // Public Website View
  const currentPage = activeSlug ? storage.getPageBySlug(activeSlug) : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        currentView={view === 'page' ? `page-${activeSlug}` : view}
        onNavigate={handleNavigate}
        pages={pages}
      />

      <main style={{ flexGrow: 1 }}>
        {view === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <IntegrationsGrid onNavigate={handleNavigate} />
            <PricingTable
              packages={packages}
              onSelectPackage={handleSelectPackage}
            />
            <section className="section" id="demo-calc">
              <div className="container">
                <div className="section-head">
                  <div className="section-tag">Canlı Simülasyon</div>
                  <h2 className="section-title">Operasyonel Tasarruf ve Canlı Demo</h2>
                  <p className="section-desc">
                    Hatalı paketlemeyi sıfırlayın, stok uyuşmazlığından kaynaklanan cezalara veda edin.
                  </p>
                </div>
                <div className="demo-section-wrap">
                  <RoiCalculator />
                  <DemoForm
                    initialPackage={selectedPackageForDemo}
                    onSubmitted={refreshData}
                  />
                </div>
              </div>
            </section>
            <ContactSection />
          </>
        )}

        {view === 'integrations' && (
          <>
            <section className="hero-section" style={{ padding: '60px 0 40px 0' }}>
              <div className="container" style={{ textAlign: 'center' }}>
                <span className="badge badge-primary">E-Ticaret Omurgası</span>
                <h1 className="hero-title" style={{ fontSize: 38 }}>
                  Tüm Pazaryeri ve Saha Entegrasyonları
                </h1>
                <p className="hero-subtitle" style={{ maxWidth: 720, margin: '0 auto' }}>
                  Trendyol, Hepsiburada, N11, barkodlu paketleme masası ve zarar önleyici onay kalkanı dahil tüm yetenekler.
                </p>
              </div>
            </section>
            <IntegrationsGrid onNavigate={handleNavigate} />
            <section className="section section-alt">
              <div className="container" style={{ maxWidth: 800 }}>
                <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 32px auto' }}>
                  <div className="section-tag">Doğrudan Başlayın</div>
                  <h2 className="section-title">Mağazanız İçin Entegrasyon Planı Oluşturalım</h2>
                </div>
                <DemoForm onSubmitted={refreshData} />
              </div>
            </section>
          </>
        )}

        {view === 'pricing' && (
          <>
            <PricingTable
              packages={packages}
              onSelectPackage={handleSelectPackage}
            />
            <ContactSection />
          </>
        )}

        {view === 'demo' && (
          <section className="section" style={{ paddingTop: 60 }}>
            <div className="container">
              <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 48px auto' }}>
                <span className="badge badge-primary">Ücretsiz Canlı Demo</span>
                <h1 className="hero-title" style={{ fontSize: 38 }}>
                  Jeina Panelini Mağazanızda Test Edin
                </h1>
                <p className="hero-subtitle" style={{ maxWidth: 680, margin: '0 auto' }}>
                  Aylık sipariş hacminizi girerek potansiyel tasarrufunuzu görün ve 15 dakikalık canlı yönetici demosu randevusu alın.
                </p>
              </div>
              <div className="demo-section-wrap">
                <RoiCalculator />
                <DemoForm
                  initialPackage={selectedPackageForDemo}
                  onSubmitted={refreshData}
                />
              </div>
            </div>
          </section>
        )}

        {view === 'contact' && (
          <ContactSection />
        )}

        {view === 'page' && currentPage && (
          <DynamicPageRenderer
            page={currentPage}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
