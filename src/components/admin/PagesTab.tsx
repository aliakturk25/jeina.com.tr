import React, { useState } from 'react';
import { DynamicPage, DynamicPageBlock } from '../../types';
import { storage } from '../../services/storage';

interface PagesTabProps {
  pages: DynamicPage[];
  onRefresh: () => void;
  onPreviewPage: (slug: string) => void;
}

export const PagesTab: React.FC<PagesTabProps> = ({ pages, onRefresh, onPreviewPage }) => {
  const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [heroBadge, setHeroBadge] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [targetMarketplace, setTargetMarketplace] = useState('Trendyol');
  const [featuresRaw, setFeaturesRaw] = useState('');
  const [faqRaw, setFaqRaw] = useState('');

  const openNew = () => {
    setEditingPage(null);
    setIsCreating(true);
    setTitle('Hepsiburada Entegrasyon Paketi');
    setSlug('hepsiburada-entegrasyonu');
    setMetaDescription('Hepsiburada mağazanızı Jeina ile bağlayın, Buybox takibi ve anlık stokla satışlarınızı katlayın.');
    setHeroBadge('Resmi Hepsiburada API');
    setHeroTitle('Hepsiburada Satışlarında Buybox ve Anlık Stok Gücü');
    setHeroSubtitle('Komisyon oranınıza göre otomatik fiyat revizyonu yapın, siparişleri tek tıkla kargoya verin.');
    setTargetMarketplace('Hepsiburada');
    setFeaturesRaw('Akıllı Buybox Motoru | Minimum kar marjınızı koruyarak Buybox kazanın.\nAnlık Stok Eşitleme | Ürün satıldığında Hepsiburada stoğu 3 saniyede güncellenir.\nOtomatik Kargo Barkodu | Hepsiburada anlaşmalı kargo etiketleri tek ekranda hazır.');
    setFaqRaw('Hepsiburada API entegrasyonu ücretli mi? | Hayır, Jeina aboneliğiniz kapsamında tüm API bağlantıları ücretsizdir.\nGeçmiş siparişler aktarılır mı? | Evet, son 30 günlük sipariş geçmişinizi sisteme otomatik çekebilirsiniz.');
  };

  const openEdit = (page: DynamicPage) => {
    setEditingPage(page);
    setIsCreating(false);
    setTitle(page.title);
    setSlug(page.slug);
    setMetaDescription(page.metaDescription);
    setHeroBadge(page.heroBadge || '');
    setHeroTitle(page.heroTitle);
    setHeroSubtitle(page.heroSubtitle);
    setTargetMarketplace(page.targetMarketplace || 'Genel');

    const featBlock = page.blocks.find(b => b.type === 'features');
    if (featBlock && featBlock.items) {
      setFeaturesRaw(featBlock.items.map(i => `${i.title} | ${i.desc}`).join('\n'));
    } else {
      setFeaturesRaw('');
    }

    const faqBlock = page.blocks.find(b => b.type === 'faq');
    if (faqBlock && faqBlock.items) {
      setFaqRaw(faqBlock.items.map(i => `${i.title} | ${i.desc}`).join('\n'));
    } else {
      setFaqRaw('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = storage.getPages();

    // Özellik bloklarını ayrıştır
    const featureItems = featuresRaw.split('\n').filter(Boolean).map(line => {
      const parts = line.split('|');
      return {
        title: parts[0]?.trim() || 'Özellik',
        desc: parts[1]?.trim() || ''
      };
    });

    // SSS bloklarını ayrıştır
    const faqItems = faqRaw.split('\n').filter(Boolean).map(line => {
      const parts = line.split('|');
      return {
        title: parts[0]?.trim() || 'Soru',
        desc: parts[1]?.trim() || ''
      };
    });

    const blocks: DynamicPageBlock[] = [
      {
        id: 'block-feat-' + Date.now(),
        type: 'features',
        title: `${title} Özel Modül Yetenekleri`,
        subtitle: 'Saha operasyonunuza hız ve güvenlik katan araçlar',
        items: featureItems
      }
    ];

    if (faqItems.length > 0) {
      blocks.push({
        id: 'block-faq-' + Date.now(),
        type: 'faq',
        title: `${title} Hakkında Merak Edilenler`,
        items: faqItems
      });
    }

    // Form bloğu otomatik eklenir
    blocks.push({
      id: 'block-form-' + Date.now(),
      type: 'form',
      title: 'Hemen Başlayın'
    });

    if (isCreating) {
      const newPage: DynamicPage = {
        id: 'page-' + Date.now(),
        slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        title,
        metaDescription,
        heroBadge,
        heroTitle,
        heroSubtitle,
        targetMarketplace,
        blocks,
        isActive: true,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10)
      };
      storage.savePages([...currentList, newPage]);
    } else if (editingPage) {
      const updatedList = currentList.map(p => {
        if (p.id === editingPage.id) {
          return {
            ...p,
            slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            title,
            metaDescription,
            heroBadge,
            heroTitle,
            heroSubtitle,
            targetMarketplace,
            blocks,
            updatedAt: new Date().toISOString().slice(0, 10)
          };
        }
        return p;
      });
      storage.savePages(updatedList);
    }

    setIsCreating(false);
    setEditingPage(null);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu sayfayı silmek istediğinize emin misiniz?')) {
      const currentList = storage.getPages().filter(p => p.id !== id);
      storage.savePages(currentList);
      onRefresh();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--border-dark)' }}>Dinamik Sayfa Oluşturucu (Landing Page Builder)</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Kod yazmadan istediğiniz pazaryeri veya entegrasyon çözümü için yeni vitrin sayfaları oluşturun ve yayınlayın.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          + Yeni Sayfa / Paket Oluştur
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pages.map(page => (
          <div key={page.id} className="sharp-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="badge badge-primary">{page.targetMarketplace || 'Genel'}</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--border-dark)' }}>{page.title}</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-subtle)' }}>
                  /{page.slug}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6, maxWidth: 640 }}>
                {page.heroSubtitle}
              </p>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 8 }}>
                Oluşturulma: {page.createdAt} | Güncelleme: {page.updatedAt} | Blok Sayısı: {page.blocks.length}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => onPreviewPage(page.slug)}>
                Vitrinde Gör
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => openEdit(page)}>
                Düzenle
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--danger)' }}
                onClick={() => handleDelete(page.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Page Builder Modal */}
      {(isCreating || editingPage) && (
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
          <div className="sharp-card" style={{ width: 740, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 14 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>
                {isCreating ? 'Yeni Entegrasyon Paketi Sayfası Oluştur' : `Düzenle: ${editingPage?.title}`}
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => { setIsCreating(false); setEditingPage(null); }}>
                Kapat
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Sayfa Başlığı *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">URL Adresi (Slug) *</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>jeina.com.tr/</span>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="ornegin-trendyol-paketi"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hedef Kanal / Kategori</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Örn: Trendyol, Hepsiburada, Depo..."
                    value={targetMarketplace}
                    onChange={(e) => setTargetMarketplace(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hero Üst Rozeti</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Örn: Resmi API Entegrasyonu"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Hero Ana Başlığı *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Hero Açıklama / Alt Başlık *</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    required
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">SEO Meta Açıklaması (Google Arama Sonuçları İçin)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Özellik Kartları (Format: Başlık | Açıklama)</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Anlık Eşitleme | 3 saniyede tüm stoklar eşitlenir.&#10;Kargo Barkodu | Tek tıkla otomatik yazdırılır."
                    value={featuresRaw}
                    onChange={(e) => setFeaturesRaw(e.target.value)}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Sıkça Sorulan Sorular (Format: Soru | Cevap)</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Kurulum ne kadar sürer? | Ortalama 15 dakikada tamamlanır."
                    value={faqRaw}
                    onChange={(e) => setFaqRaw(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setIsCreating(false); setEditingPage(null); }}>
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  Sayfayı Canlıya Al
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
