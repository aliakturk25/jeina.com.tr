import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { storage } from '../../services/storage';

interface SettingsTabProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onRefresh }) => {
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [tagline, setTagline] = useState(settings.tagline);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [telegramBotToken, setTelegramBotToken] = useState(settings.telegramBotToken || '');
  const [telegramChatId, setTelegramChatId] = useState(settings.telegramChatId || '');
  const [enableTelegramNotification, setEnableTelegramNotification] = useState(settings.enableTelegramNotification);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSettings({
      siteTitle,
      tagline,
      phone,
      email,
      address,
      telegramBotToken,
      telegramChatId,
      enableTelegramNotification
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    onRefresh();
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--border-dark)', margin: 0, letterSpacing: '-0.02em' }}>Site & Bildirim Ayarları</h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
          Tanıtım sitesinin iletişim bilgileri ve gelen demo taleplerinde anlık telefon bildirimi alma ayarları.
        </p>
      </div>

      {isSaved && (
        <div style={{ marginBottom: 16, padding: '10px 14px', background: 'var(--success-bg)', border: '1px solid #a7f3d0', color: 'var(--success)', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
          Ayarlar başarıyla kaydedildi.
        </div>
      )}

      <form onSubmit={handleSave} className="sharp-card" style={{ padding: 20, borderRadius: 4 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, borderBottom: '1px solid var(--border-color)', paddingBottom: 8, margin: 0 }}>
          Genel Şirket & İletişim Bilgileri
        </h3>

        <div className="form-group">
          <label className="form-label">Site Başlığı</label>
          <input
            type="text"
            className="form-input"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Slogan / Tagline</label>
          <input
            type="text"
            className="form-input"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Kurumsal Telefon</label>
            <input
              type="text"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Destek E-Postası</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Şirket Adresi</label>
          <input
            type="text"
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 700, margin: '24px 0 16px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: 8 }}>
          Anlık Telegram Demo Bildirimi
        </h3>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            <input
              type="checkbox"
              checked={enableTelegramNotification}
              onChange={(e) => setEnableTelegramNotification(e.target.checked)}
            />
            Siteden yeni demo veya iletişim formu geldiğinde Telegram’a anında bildirim gönder
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Telegram Bot Token</label>
          <input
            type="text"
            className="form-input"
            placeholder="Örn: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
            value={telegramBotToken}
            onChange={(e) => setTelegramBotToken(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Telegram Chat ID</label>
          <input
            type="text"
            className="form-input"
            placeholder="Örn: 987654321"
            value={telegramChatId}
            onChange={(e) => setTelegramChatId(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 24 }}>
          <button type="submit" className="btn btn-primary">
            Tüm Ayarları Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};
