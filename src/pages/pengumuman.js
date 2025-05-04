export default function Pengumuman() {
  return (
    <section className="bg-slate-100 min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 border-t-4 border-green-900">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2">
            PENGUMUMAN RESMI
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Hasil Seleksi Penerimaan Peserta Didik Baru
          </h2>
          <h3 className="text-lg font-medium text-gray-700">
            Tahun Pelajaran 2025/2026
          </h3>
          <div className="w-24 h-1 bg-green-900 mx-auto mt-4"></div>
        </div>

        <div className="text-gray-800 leading-relaxed space-y-4">
          <p className="text-justify">
            Dengan ini kami sampaikan kepada seluruh calon peserta didik dan orang tua/wali bahwa hasil seleksi penerimaan peserta didik baru pada <strong className="font-semibold">Madrasah Ibtidaiyah Ma&apos;arif Nailul Huda Garum</strong> untuk Tahun Pelajaran <strong className="font-semibold">2025/2026</strong> telah resmi diumumkan.
          </p>

          <p className="text-justify">
            Seluruh pendaftar dinyatakan <strong className="font-semibold text-green-900">DITERIMA</strong> sebagai peserta didik baru dan informasi lengkap dapat diakses melalui tautan berikut:{' '}
            <a
              href="#"
              className="text-green-900 font-semibold underline hover:text-green-700"
            >
              Hasil Seleksi Peserta Didik Baru
            </a>.
          </p>

          <p className="text-justify">
            Kami mengucapkan selamat kepada seluruh calon peserta didik yang telah resmi bergabung sebagai bagian dari keluarga besar MI Ma&apos;arif Nailul Huda Garum. Semoga menjadi awal perjalanan pendidikan yang penuh makna dan berkontribusi pada masa depan yang gemilang.
          </p>

          <div className="bg-slate-50 p-4 border-l-4 border-green-900 my-6">
            <p className="font-medium mb-3">
              Sehubungan dengan hal tersebut, kami menginformasikan bahwa seluruh calon peserta didik yang telah dinyatakan diterima <strong className="font-bold text-green-900">WAJIB</strong> mengikuti proses daftar ulang yang akan diselenggarakan pada:
            </p>
            <div className="ml-4 space-y-1">
              <p><span className="font-semibold">Hari/Tanggal:</span> [Isi dengan hari dan tanggal]</p>
              <p><span className="font-semibold">Pukul:</span> [Isi dengan waktu pelaksanaan]</p>
              <p><span className="font-semibold">Tempat:</span> Kampus MI Ma&apos;arif Nailul Huda Garum</p>
            </div>
          </div>

          <p className="text-justify">
            Adapun dokumen yang harus dibawa saat daftar ulang akan disampaikan melalui pemberitahuan terpisah atau dapat dikonfirmasi langsung kepada panitia penerimaan peserta didik baru.
          </p>

          <p className="text-justify">
            Demikian pengumuman ini disampaikan untuk menjadi perhatian. Atas perhatian dan kerja sama yang baik, kami sampaikan terima kasih.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="font-semibold text-gray-800">Hormat kami,</p>
          <p className="font-bold text-green-900">Panitia Penerimaan Peserta Didik Baru</p>
          <p className="text-gray-800">MI Ma&apos;arif Nailul Huda Garum</p>
        </div>
      </div>
    </section>
  );
}
