import React from 'react';
import { ContactMessage } from '../../types';
import { storage } from '../../services/storage';

interface MessagesTabProps {
  messages: ContactMessage[];
  onRefresh: () => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ messages, onRefresh }) => {
  const handleMarkRead = (id: string) => {
    storage.markMessageRead(id);
    onRefresh();
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--border-dark)', margin: 0, letterSpacing: '-0.02em' }}>İletişim Mesajları</h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
          Tanıtım sitesindeki genel iletişim formundan gelen sorular ve teklif talepleri.
        </p>
      </div>

      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Gönderen</th>
              <th>E-Posta & Telefon</th>
              <th>Konu</th>
              <th>Mesaj</th>
              <th>Tarih</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--text-subtle)' }}>
                  Henüz gelen iletişim mesajı bulunmuyor.
                </td>
              </tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id} style={{ backgroundColor: msg.isRead ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ fontWeight: 700 }}>
                    {!msg.isRead && <span className="badge badge-primary" style={{ marginRight: 6 }}>Yeni</span>}
                    {msg.fullName}
                  </td>
                  <td>
                    <div>{msg.email}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{msg.phone}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{msg.subject}</td>
                  <td style={{ maxWidth: 320, fontSize: 13, color: 'var(--text-muted)' }}>{msg.message}</td>
                  <td style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{msg.createdAt}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {!msg.isRead && (
                        <button className="btn btn-secondary btn-sm" onClick={() => handleMarkRead(msg.id)}>
                          Okundu Yap
                        </button>
                      )}
                      <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} className="btn btn-secondary btn-sm">
                        E-posta ile Yanıtla
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
