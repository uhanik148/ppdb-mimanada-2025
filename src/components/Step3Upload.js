// COMPONENTS/STEP3UPLOAD.JS
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Step3Upload({ formData, setLoading }) {
  const [file, setFile] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorDetails(null);
  
    try {
      console.log('Form data yang akan dikirim:', formData);
      
      // Make sure calonSiswaId is included in the form data
      if (!formData.calonSiswaId) {
        throw new Error('ID calon siswa tidak ditemukan');
      }
      
      // Ensure date format is valid
      const processedFormData = {
        ...formData,
        tanggalLahir: formData.tanggalLahir ? new Date(formData.tanggalLahir).toISOString() : null
      };
  
      // Submit form data first to create the form and get ID
      const formRes = await axios.post('/api/form/create', processedFormData);
      console.log('Form creation response:', formRes.data);
      
      const formId = formRes.data.id;
  
      if (!formId) {
        throw new Error('ID form tidak diterima dari server');
      }
  
      // Upload file with form ID
      const uploadData = new FormData();
      uploadData.append('formId', formId);
      
      if (file) {
        uploadData.append('dokumenPersyaratan', file);
      } else {
        throw new Error('Dokumen persyaratan belum dipilih');
      }
  
      console.log('Mengunggah file dengan ID form:', formId);
      
      const uploadRes = await axios.post('/api/form/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload success:', uploadRes.data);
      setSubmitSuccess(true);
      toast.success('Pendaftaran berhasil dikirim!');
    } catch (error) {
      // Error handling code remains the same
    } finally {
      setLoading(false);
    }
  };
  
  if (submitSuccess) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ color: '#4CAF50', fontSize: '60px', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          ✓
        </div>
        <h2 style={{ fontSize: '24px', marginBottom: '1rem' }}>Pendaftaran Berhasil!</h2>
        <p style={{ marginBottom: '2rem' }}>
          Terima kasih telah mendaftar. Tim kami akan meninjau pendaftaran Anda dan akan menghubungi Anda segera.
        </p>
        <button onClick={() => window.location.href = '/dashboard'} style={buttonStyle}>
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={sectionTitle}>Upload Dokumen Persyaratan</h2>

      {errorDetails && (
        <div style={{ backgroundColor: '#ffebee', padding: '1rem', borderRadius: '8px', border: '1px solid #ffcdd2', marginBottom: '1rem' }}>
          <h3 style={{ color: '#c62828', marginTop: 0 }}>Terjadi Kesalahan</h3>
          <p><strong>Pesan:</strong> {errorDetails.message}</p>
          {errorDetails.response && (
            <>
              <p><strong>Status:</strong> {errorDetails.response.status}</p>
              {errorDetails.response.data && (
                <div>
                  <p><strong>Detail dari server:</strong></p>
                  <pre style={{ backgroundColor: '#f5f5f5', padding: '0.5rem', borderRadius: '4px', overflow: 'auto', maxHeight: '150px' }}>
                    {JSON.stringify(errorDetails.response.data, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div style={infoBox}>
        <h3 style={{ fontSize: '16px', marginBottom: '0.75rem' }}>Panduan Upload Dokumen</h3>
        <p>Silakan upload <strong>satu file dokumen</strong> yang berisi semua persyaratan berikut:</p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Scan Kartu Keluarga (KK)</li>
          <li>Scan Akta Kelahiran</li>
          <li>Scan Ijazah TK</li>
          <li>Scan Kartu PKH (jika ada)</li>
          <li>Bukti Pembayaran</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Anda dapat menggunakan Microsoft Word, PDF, atau dokumen OneDrive yang berisi semua persyaratan di atas.
        </p>
      </div>

      <div style={formGroup}>
        <label htmlFor="dokumenPersyaratan">
          Upload Dokumen <span style={{color: 'red'}}>*</span>
        </label>
        <input
          id="dokumenPersyaratan"
          type="file"
          onChange={handleFileChange}
          required
          accept=".doc,.docx,.pdf"
          style={fileInputStyle}
        />
        <p style={{ color: '#666', fontSize: '12px', marginTop: '0.25rem' }}>
          Format yang diterima: .doc, .docx, .pdf (Maksimal 10MB)
        </p>
      </div>

      <div style={confirmationBox}>
        <h3 style={{ fontSize: '16px', marginBottom: '0.5rem' }}>Konfirmasi Pengiriman Data</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Dengan menekan tombol "Submit Pendaftaran", Anda menyetujui bahwa:
        </p>
        <ul style={{ color: '#666', fontSize: '14px', paddingLeft: '1.5rem' }}>
          <li>Data yang dimasukkan sudah benar dan lengkap</li>
          <li>Dokumen yang diupload berisi semua persyaratan yang diminta</li>
          <li>Anda telah membaca dan menyetujui persyaratan pendaftaran</li>
        </ul>
      </div>

      <button type="submit" style={buttonStyle} disabled={!file}>
        Submit Pendaftaran
      </button>
    </form>
  );
}

// Style objects
const sectionTitle = {
  marginTop: '1rem',
  marginBottom: '1rem',
  fontSize: '18px',
  fontWeight: 'bold',
};

const infoBox = {
  backgroundColor: '#e7f3ff',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #b3d7ff',
  marginBottom: '1rem',
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const fileInputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
};

const confirmationBox = {
  backgroundColor: '#f9f9f9',
  padding: '1rem',
  borderRadius: '8px',
  marginTop: '1rem',
  border: '1px solid #eee',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '1rem',
};