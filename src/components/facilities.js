export default function Facilities() {
  const facilities = [
    {
      title: "Gedung yang Representatif",
      description:
        "Bangunan sekolah yang modern, luas, dan nyaman, dirancang untuk menciptakan lingkungan belajar yang kondusif dan inspiratif bagi siswa.",
    },
    {
      title: "Asrama Pondok Pesantren",
      description:
        "Fasilitas asrama yang nyaman dengan pengawasan yang ketat untuk membentuk kedisiplinan dan kebiasaan belajar mandiri bagi para santri.",
    },
    {
      title: "Yatim Piatu Gratis di Pondok Pesantren",
      description:
        "Program beasiswa penuh bagi anak yatim piatu, memberikan mereka kesempatan untuk mendapatkan pendidikan berkualitas dalam lingkungan yang mendukung.",
    },
    {
      title: "Perpustakaan",
      description:
        "Koleksi buku yang lengkap dan akses ke sumber belajar digital untuk mendukung minat baca serta peningkatan wawasan akademik siswa.",
    },
    {
      title: "Laboratorium IPA",
      description:
        "Laboratorium yang dilengkapi dengan peralatan modern untuk eksperimen sains, mendukung pembelajaran berbasis praktik dan penelitian.",
    },
    {
      title: "Sarana Olahraga",
      description:
        "Lapangan olahraga, dan fasilitas kebugaran lainnya yang dirancang untuk meningkatkan kesehatan fisik serta semangat sportivitas siswa.",
    },
    {
      title: "Koperasi",
      description:
        "Koperasi sekolah yang menyediakan berbagai kebutuhan siswa seperti alat tulis, seragam, hingga makanan ringan dengan harga terjangkau.",
    },
    {
      title: "Extrakuliler",
      description:
        "MI Ma'arif Nailul Huda Bonsari memiliki berbagai ekstrakurikuler yang dirancang untuk membangun karakter individu maupun kelompok, serta menumbuhkan jiwa kepemimpinan yang kuat di kalangan peserta didik"
    },
    {
      title: "Punya Program Unggulan Keren",
      description:
        "Menjalankan Sholat Dhua dan Dzuhur berjamaah, Pegon setiap pagi, Tahfidzul Quran, Mengajar siswa supaya memiliki keterampilan ceramah dan Hizbul Waton"
    },
  ];

  return (
    <section id="facilities" className="py-12 px-6" style={{ backgroundColor: "#f1f1f1" }}>
      <h2 className="text-4xl font-extrabold text-center text-gray-800">
        Mengapa MI Ma'arif Nailul Huda Bonsari?
      </h2>
      <p className="mt-4 text-center text-lg text-gray-600">
        Sekolah kami menyediakan berbagai fasilitas modern untuk mendukung perkembangan akademik, karakter, dan kesejahteraan siswa.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold text-green-700 drop-shadow-sm hover:text-green-800 transition-colors duration-200">
              {facility.title}
            </h3>
            <p className="mt-2 text-gray-600">{facility.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
