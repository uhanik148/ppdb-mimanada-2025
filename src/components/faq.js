import React, { useState } from "react";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";

export default function FloatingFaq() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "Apakah siswa luar Jawa bisa lolos?",
      a: "Tentu saja! Siswa dari luar Pulau Jawa memiliki kesempatan yang sama untuk lolos. Apalagi, MI Ma'arif Nailul Huda juga berkolaborasi atau memiliki pondok yang dapat mempermudah siswa yang berasal dari daerah yang jauh. Dengan adanya fasilitas ini, siswa tidak perlu khawatir mengenai tempat tinggal, sehingga mereka bisa lebih fokus dalam belajar dan mengembangkan potensi mereka.",
    },
    {
      q: "Apakah ada sosial media?",
      a: "MI Ma'arif Nailul Huda memiliki beberapa akun media sosial yang aktif digunakan untuk berbagi informasi mengenai kegiatan sekolah, pengumuman, dan hal-hal lainnya yang berkaitan dengan sekolah. Anda dapat mengikuti sekolah ini di platform seperti Instagram dan Facebook untuk mendapatkan update terbaru.",
    },
    {
      q: "Dimana letak pondoknya?",
      a: "Pondok yang berkolaborasi dengan MI Ma'arif Nailul Huda bernama <b>Pondok Attaubah.</b> Pondok ini terletak tepat di sebelah utara MI Ma'arif Nailul Huda, sehingga sangat strategis dan memudahkan para siswa yang berasal dari daerah jauh untuk mendapatkan tempat tinggal yang nyaman dan lingkungan yang kondusif untuk belajar. Dengan adanya Pondok Attaubah, siswa tidak hanya mendapatkan pendidikan formal di sekolah, tetapi juga dapat memperdalam nilai-nilai keagamaan serta kedisiplinan dalam kehidupan sehari-hari.",
    },
  ];

  return (
    <>
      {/* Bubble button with FAQ text */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 hover:bg-green-700 transition flex items-center gap-2"
        aria-label="Buka FAQ"
      >
        {open ? <FaTimes size={20} /> : <FaQuestionCircle size={20} />}
        <span className="font-medium">FAQ</span>
      </button>

      {/* FAQ Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 shadow-2xl rounded-lg p-4 z-50">
          <h4 className="text-lg font-semibold mb-3 text-green-800">FAQ</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {faqs.map((item, i) => (
              <div key={i} className="border-b pb-2">
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full text-left font-medium text-gray-800"
                >
                  {item.q}
                </button>
                {activeIndex === i && (
                  <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: item.a }}></p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}