// Components/Step1Form.js
import { useState } from 'react';

export default function Step1Form({ nextStep, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={sectionTitle}>Data Pribadi</h2>

      {/* Tambahkan field NISN */}
      <div style={formGroup}>
        <label htmlFor="nisn">NISN</label>
        <input 
          id="nisn"
          name="nisn" 
          placeholder="Nomor Induk Siswa Nasional" 
          value={formData.nisn || ''}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
        <small style={helperText}>Masukkan NISN yang sudah terdaftar</small>
      </div>

      <div style={formGroup}>
        <label htmlFor="nik">NIK</label>
        <input 
          id="nik"
          name="nik" 
          placeholder="NIK" 
          value={formData.nik}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="tk">Asal TK</label>
        <input 
          id="tk"
          name="tk" 
          placeholder="Asal TK" 
          value={formData.tk}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="tanggalLahir">Tanggal Lahir</label>
        <input 
          id="tanggalLahir"
          name="tanggalLahir" 
          type="date" 
          value={formData.tanggalLahir}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="tempatLahir">Tempat Lahir</label>
        <input 
          id="tempatLahir"
          name="tempatLahir" 
          placeholder="Tempat Lahir" 
          value={formData.tempatLahir}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="alamat">Alamat</label>
        <input 
          id="alamat"
          name="alamat" 
          placeholder="Alamat" 
          value={formData.alamat}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="agama">Agama</label>
        <input 
          id="agama"
          name="agama" 
          placeholder="Agama" 
          value={formData.agama}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <div style={formGroup}>
        <label htmlFor="hobi">Hobi</label>
        <input 
          id="hobi"
          name="hobi" 
          placeholder="Hobi" 
          value={formData.hobi}
          onChange={handleChange} 
          style={inputStyle} 
        />
      </div>
      
      <h2 style={sectionTitle}>Biodata Orang Tua/Wali</h2>
      
      <div style={formGroup}>
        <label htmlFor="namaWali">Nama Wali</label>
        <input 
          id="namaWali"
          name="namaWali" 
          placeholder="Nama Wali" 
          value={formData.namaWali}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>
      
      <div style={formGroup}>
        <label htmlFor="ttlWali">Tempat, Tanggal Lahir Wali</label>
        <input 
          id="ttlWali"
          name="ttlWali" 
          placeholder="Tempat, Tanggal Lahir Wali" 
          value={formData.ttlWali}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>
      
      <div style={formGroup}>
        <label htmlFor="pekerjaanWali">Pekerjaan Wali</label>
        <input 
          id="pekerjaanWali"
          name="pekerjaanWali" 
          placeholder="Pekerjaan Wali" 
          value={formData.pekerjaanWali}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>
      
      <div style={formGroup}>
        <label htmlFor="pendapatanWali">Pendapatan Wali per Bulan</label>
        <input 
          id="pendapatanWali"
          name="pendapatanWali" 
          placeholder="Pendapatan Wali per bulan" 
          value={formData.pendapatanWali}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>
      
      <div style={formGroup}>
        <label htmlFor="noRumah">Nomor Telepon Rumah / HP</label>
        <input 
          id="noRumah"
          name="noRumah" 
          placeholder="Nomor Telepon Rumah / HP" 
          value={formData.noRumah}
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
      </div>

      <button type="submit" style={buttonStyle}>Lanjut ke Data Sekolah</button>
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
  marginTop: '1rem'
}

const sectionTitle = {
  marginTop: '1rem',
  marginBottom: '1rem',
  fontSize: '18px',
  fontWeight: 'bold',
}

const helperText = {
  fontSize: '12px',
  color: '#666',
  marginTop: '0.25rem',
}