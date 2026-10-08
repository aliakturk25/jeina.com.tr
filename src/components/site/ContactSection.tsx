import React, { useState } from 'react';
import { storage } from '../../services/storage';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const settings = storage.getSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      alert('Lütfen Ad Soyad, E-posta ve Mesaj alanlarını doldurunuz.');
      return;
    }

    storage.addMessage({
      fullName,
      email,
      phone,
      subject: subject || 'Genel Bilgi Talebi',
      message
    });

    setIsSuccess(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 48px auto' }}>
          <div className="section-tag">Doğrudan İletişim</div>
          <h2 className="section-title">Uzman Ekibimize Ulaşın</h2>
          <p className="section-desc">
            Entegrasyon ihtiyaçlarınız, özel API gereksinimleriniz veya kurumsal paket teklifleri için bize yazın.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-start' }}>
          {/* Contact Details Card */}
          <div className="sharp-card" style={{ padding: 36 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--border-dark)', marginBottom: 16 }}>
              Jeina Operasyon & Destek Merkezi
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>
              Hafta içi 08:30 - 18:30 saatleri arasında kurumsal müşteri temsilcilerimize doğrudan ulaşabilir, mağazanız için özel entegrasyon fizibilitesi talep edebilirsiniz.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Ofis Adresi</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--border-dark)', marginTop: 2 }}>{settings.address}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Telefon Hattı</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginTop: 2 }}>{settings.phone}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>E-Posta</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--border-dark)', marginTop: 2 }}>{settings.email}</div>
              </div>
            </div>

            <div style={{ marginTop: 28, padding: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--border-dark)' }}>Kurumsal SLA Güvencesi</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Sözleşmeli işletmeler için 15 dakika içinde ilk müdahale ve kesintisiz teknik destek garantisi verilmektedir.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-card">
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <span className="badge badge-success" style={{ marginBottom: 12 }}>MESAJ GÖNDERİLDİ</span>
                <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Mesajınız Bize Ulaştı</h4>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
                  Talebiniz yönetim panelimize iletilmiştir. En kısa sürede sizinle iletişime geçeceğiz.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => setIsSuccess(false)}>
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Adınız Soyadınız *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">E-Posta Adresiniz *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telefon</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="05XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Konu</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Örn: Çoklu Mağaza Entegrasyon Teklifi"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mesajınız *</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    required
                    placeholder="Entegrasyon hedeflerinizden veya merak ettiğiniz konulardan kısaca bahsedin..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }}>
                  Mesajı İlet
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
