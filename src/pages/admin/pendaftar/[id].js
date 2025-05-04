// DETAIL PAGE COMPONENT (pages/admin/pendaftar/[id].js)
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailPendaftar() {
  const router = useRouter();
  const { id } = router.query;
  const [calon, setCalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // First check if the router is ready
    if (!router.isReady) return;
    
    // Handle the case when ID is undefined - usually happens on initial page load
    if (!id || id === 'undefined') {
      // Instead of showing an error immediately, we can redirect to the listing page
      router.replace('/admin/kelola-data-pendaftar');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data for ID: ${id}`);
        const res = await axios.get(`/api/admin/pendaftar/${id}`);
        console.log("Data fetched:", res.data);
        setCalon(res.data);
        setError(null);
      } catch (err) {
        console.error('Gagal mengambil detail pendaftar', err);
        // Extract error message from response if available
        const errorMessage = err.response?.data?.error || 
                            err.response?.data?.message || 
                            err.message || 
                            'Terjadi kesalahan saat mengambil data';
        setError(errorMessage);
        setCalon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, id, router]);

  const handleBack = () => {
    router.push('/admin/kelola-data-pendaftar');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">
        <p className="font-medium">Error: {error}</p>
      </div>
      <button
        onClick={handleBack}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        ← Kembali
      </button>
    </div>
  );
  
  if (!calon) return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <p className="text-center">Data tidak ditemukan</p>
      <div className="mt-6 text-center">
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );

  // Ensure form data is available and safely handle all possible properties
  const form = calon.form || {};

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Detail Pendaftar
      </h1>
      <div className="space-y-4">
        <p><strong>Nama:</strong> {calon.nama || '-'}</p>
        <p><strong>NISN:</strong> {calon.nisn || '-'}</p>
        <p><strong>TK Asal:</strong> {form.tk || '-'}</p>
        <p><strong>NIK:</strong> {form.nik || '-'}</p>
        <p><strong>Tempat, Tgl Lahir:</strong> {form.tempatLahir || '-'}, {form.tanggalLahir ? new Date(form.tanggalLahir).toLocaleDateString() : '-'}</p>
        <p><strong>Alamat:</strong> {form.alamat || '-'}</p>
        <p><strong>Agama:</strong> {form.agama || '-'}</p>
        <p><strong>Hobi:</strong> {form.hobi || '-'}</p>
        <p><strong>Sekolah Asal:</strong> {form.namaSekolah || '-'}</p>
        <p><strong>Status Sekolah:</strong> {form.statusSekolahAsal || '-'}</p>
        <p><strong>Nama Wali:</strong> {form.namaWali || '-'}</p>
        <p><strong>Pekerjaan Wali:</strong> {form.pekerjaanWali || '-'}</p>
        <p><strong>Pendapatan Wali:</strong> {form.pendapatanWali || '-'}</p>
        {form.berkas && (
          <p>
            <strong>Berkas:</strong> <a href={form.berkas.url} target="_blank" className="text-blue-600 hover:underline" rel="noopener noreferrer">
              {form.berkas.namaFile}
            </a>
          </p>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
}