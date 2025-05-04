import { useState, useEffect } from 'react';

export default function Pendaftaran() {
  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <section
      id="pendaftaran"
      className={`py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100 transition-opacity duration-1000 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-2 relative inline-block">
          Pendaftaran Online
          <span className="block h-1 w-24 bg-green-500 mx-auto mt-2 rounded-full"></span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Siap menjadi bagian dari keluarga besar{' '}
          <span className="font-semibold text-green-800">MI MAA'RIF NAILUL HUDA</span>? Yuk, ikuti langkah-langkah pendaftarannya berikut ini!
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* KIRI */}
        <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-green-600 hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">💡 Informasi Pendaftaran</h3>
<ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed">
  <li>Seluruh informasi terkait PPDB dapat diakses secara online dengan mudah.</li>
  <li>Proses pendaftaran tidak memerlukan antrean dan dapat dilakukan dari rumah.</li>
  <li>Petunjuk pengisian dan alur pendaftaran telah disediakan secara jelas dan terstruktur.</li>
</ul>

<h3 className="text-2xl font-semibold text-green-700 mb-4 mt-8">📋 Persyaratan Pendaftaran Siswa Baru</h3>
<ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed">
  <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
    <svg className="w-5 h-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2 2 4-4m2 4l5-5 5 5"></path>
    </svg>
    <span>Fotokopi Akta Kelahiran</span>
    <span className="ml-auto text-gray-500">1 lembar</span>
  </li>
  <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
    <svg className="w-5 h-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2 2 4-4m2 4l5-5 5 5"></path>
    </svg>
    <span>Fotokopi Kartu Keluarga (KK)</span>
    <span className="ml-auto text-gray-500">1 lembar</span>
  </li>
  <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
    <svg className="w-5 h-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2 2 4-4m2 4l5-5 5 5"></path>
    </svg>
    <span>Fotokopi Ijazah TK/RA</span>
    <span className="ml-auto text-gray-500">1 lembar</span>
  </li>
  <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-300">
    <svg className="w-5 h-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2 2 4-4m2 4l5-5 5 5"></path>
    </svg>
    <span>Fotokopi PKH (bagi yang punya)</span>
    <span className="ml-auto text-gray-500">1 lembar</span>
  </li>
</ul>




          <a
            href="https://docs.google.com/document/d/1_3zlmWQZY1DCyRZRvw9wcI2Q4d6lotAx/edit?usp=drivesdk&ouid=107554841256569226910&rtpof=true&sd=true"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
            Petunjuk Pengisian
          </a>
        </div>

        {/* KANAN */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          <img
            src="alurppdb.jpg"
            alt="Alur Pendaftaran"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <p className="text-white font-medium">Klik untuk memperbesar</p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src="alurppdb.jpg"
              alt="Alur Pendaftaran"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
