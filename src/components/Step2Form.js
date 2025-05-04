//Components/Step2Form.js
import { useState } from 'react';

export default function Step2Form({ nextStep, prevStep, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(); // Sekarang ini hanya untuk menuju ke step berikutnya
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={sectionTitle}>Data Sekolah</h2>

      <div style={formGroup}>
        <label htmlFor="namaSekolah">Nama Sekolah Asal</label>
        <input 
          id="namaSekolah"
          name="namaSekolah" 
          placeholder="Nama Sekolah Asal" 
          value={formData.namaSekolah}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="statusSekolahAsal">Status Sekolah</label>
        <select
          id="statusSekolahAsal"
          name="statusSekolahAsal"
          value={formData.statusSekolahAsal}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">-- Pilih Status Sekolah --</option>
          <option value="Negeri">Negeri</option>
          <option value="Swasta">Swasta</option>
        </select>
      </div>

      <div style={formGroup}>
        <label htmlFor="alamatSekolah">Alamat Sekolah Asal</label>
        <textarea
          id="alamatSekolah"
          name="alamatSekolah"
          placeholder="Alamat Sekolah Asal"
          value={formData.alamatSekolah}
          onChange={handleChange}
          required
          style={{...inputStyle, minHeight: '100px'}}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="button" onClick={prevStep} style={backButtonStyle}>Kembali</button>
        <button type="submit" style={buttonStyle}>Lanjut</button>
      </div>
    </form>
  );
}

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
}

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  flex: 1,
}

const backButtonStyle = {
  backgroundColor: '#aaa',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  flex: 1,
}

const sectionTitle = {
  marginTop: '1rem',
  marginBottom: '1rem',
  fontSize: '18px',
  fontWeight: 'bold',
}