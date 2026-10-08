import React, { useState } from 'react';
import { DemoLead } from '../../types';
import { storage } from '../../services/storage';

interface LeadsTabProps {
  leads: DemoLead[];
  onRefresh: () => void;
}

export const LeadsTab: React.FC<LeadsTabProps> = ({ leads, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TÜMÜ');
  const [selectedLead, setSelectedLead] = useState<DemoLead | null>(null);

  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'TÜMÜ' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: DemoLead['status']) => {
    storage.updateLeadStatus(id, newStatus);
    onRefresh();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu demo talebini silmek istediğinize emin misiniz?')) {
      storage.deleteLead(id);
      setSelectedLead(null);
      onRefresh();
    }
  };

  const exportToCSV = () => {
    const headers = ['Firma Adi,Yetkili,Telefon,Eposta,Hacim,Pazaryerleri,Paket,Durum,Tarih,Notlar'];
    const rows = leads.map(l =>
      `"${l.companyName}","${l.fullName}","${l.phone}","${l.email}","${l.monthlyOrders}","${l.marketplaces.join('; ')}","${l.interestedPackage || ''}","${l.status}","${l.createdAt}","${(l.notes || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jeina_demo_talepleri_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--border-dark)' }}>Demo Talepleri (Lead CRM)</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Tanıtım sitesinden gelen tüm demo ve teklif formlarını inceleyin, durumlarını güncelleyin ve CSV olarak indirin.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={exportToCSV}>
            CSV / Excel İndir ({leads.length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <input
          type="text"
          className="form-input"
          placeholder="Firma adı, yetkili, telefon veya e-posta ile ara..."
          style={{ width: 340 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 6 }}>
          {['TÜMÜ', 'Yeni', 'Arandı', 'Demo Yapıldı', 'Satışa Döndü', 'İptal'].map(status => (
            <button
              key={status}
              className={`btn btn-sm ${statusFilter === status ? 'btn-dark' : 'btn-secondary'}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Firma Adı</th>
              <th>İletişim Kişisi</th>
              <th>Telefon</th>
              <th>E-Posta</th>
              <th>Pazaryerleri</th>
              <th>İlgilenilen Paket</th>
              <th>Tarih</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 32, color: 'var(--text-subtle)' }}>
                  Arama kriterlerine uygun demo talebi bulunamadı.
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr key={lead.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedLead(lead)}>
                  <td style={{ fontWeight: 700 }}>{lead.companyName}</td>
                  <td>{lead.fullName}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{lead.phone}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{lead.email}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {lead.marketplaces.map(m => (
                        <span key={m} style={{ fontSize: 10, padding: '1px 5px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 2 }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{lead.interestedPackage || 'Genel'}</td>
                  <td style={{ fontSize: 11, color: 'var(--text-subtle)' }}>{lead.createdAt}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      className="form-input"
                      style={{ padding: '4px 8px', fontSize: 12, height: 30 }}
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as DemoLead['status'])}
                    >
                      <option value="Yeni">Yeni</option>
                      <option value="Arandı">Arandı</option>
                      <option value="Demo Yapıldı">Demo Yapıldı</option>
                      <option value="Satışa Döndü">Satışa Döndü</option>
                      <option value="İptal">İptal</option>
                    </select>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--danger)', borderColor: 'var(--border-color)' }}
                      onClick={() => handleDelete(lead.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal / Drawer */}
      {selectedLead && (
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
          <div className="sharp-card" style={{ width: 560, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 14 }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: 4 }}>Talep Detayı</span>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>{selectedLead.companyName}</h3>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedLead(null)}>
                Kapat
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
              <div><strong>Yetkili:</strong> {selectedLead.fullName}</div>
              <div><strong>Telefon:</strong> <a href={`tel:${selectedLead.phone}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{selectedLead.phone}</a></div>
              <div><strong>Kurumsal E-posta:</strong> <a href={`mailto:${selectedLead.email}`} style={{ color: 'var(--primary)' }}>{selectedLead.email}</a></div>
              <div><strong>Aylık Sipariş Hacmi:</strong> {selectedLead.monthlyOrders}</div>
              <div><strong>İlgilenilen Paket:</strong> {selectedLead.interestedPackage || 'Belirtilmedi'}</div>
              <div>
                <strong>Entegre Edilecek Pazaryerleri:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {selectedLead.marketplaces.map(mp => (
                    <span key={mp} className="badge">{mp}</span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Talep Notu / Açıklama:</strong>
                <div style={{ background: 'var(--bg-secondary)', padding: 12, border: '1px solid var(--border-color)', borderRadius: 2, marginTop: 6, fontSize: 13 }}>
                  {selectedLead.notes || 'Özel bir not belirtilmemiş.'}
                </div>
              </div>
              <div><strong>Oluşturulma Tarihi:</strong> {selectedLead.createdAt}</div>
              <div>
                <strong>Durum:</strong>
                <select
                  className="form-input"
                  style={{ marginTop: 6, width: '100%' }}
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as DemoLead['status'])}
                >
                  <option value="Yeni">Yeni</option>
                  <option value="Arandı">Arandı</option>
                  <option value="Demo Yapıldı">Demo Yapıldı</option>
                  <option value="Satışa Döndü">Satışa Döndü</option>
                  <option value="İptal">İptal</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setSelectedLead(null)}>
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
