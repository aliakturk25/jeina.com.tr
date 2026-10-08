import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Güvenli varsayılan yönetim paneli giriş bilgileri
    if ((username === 'admin' || username === 'jeina') && (password === 'Jeina2026!' || password === 'admin')) {
      localStorage.setItem('jeina_admin_auth', 'true');
      setError('');
      onLoginSuccess();
    } else {
      setError('Hatalı kullanıcı adı veya şifre girdiniz.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div className="sharp-card" style={{ width: 420, padding: 36, backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="logo-brand" style={{ fontSize: 28, marginBottom: 4 }}>JEINA</div>
          <span className="badge badge-primary">Web Sitesi Yönetim Paneli (CMS)</span>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>
            Lütfen devam etmek için yönetici kimlik bilgilerinizi giriniz.
          </p>
        </div>

        {error && (
          <div style={{
            marginBottom: 20,
            padding: '10px 14px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: 2,
            fontSize: 13,
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Yönetici Kullanıcı Adı</label>
            <input
              type="text"
              className="form-input"
              required
              autoFocus
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">Yönetici Şifresi</label>
            <input
              type="password"
              className="form-input"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: 24 }}
          >
            Yönetim Paneline Giriş Yap
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: 10 }}
            onClick={onCancel}
          >
            ← Vitrin Sitesine Dön
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)', fontSize: 11, color: 'var(--text-subtle)', textAlign: 'center' }}>
          Jeina E-Ticaret Entegrasyon Sistemleri A.Ş. &copy; 2026
        </div>
      </div>
    </div>
  );
};
