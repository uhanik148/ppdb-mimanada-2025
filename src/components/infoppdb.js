import { useState } from "react";

export default function Infoppdb() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <section className="p-10 text-center">
      <h3 className="text-3xl font-bold text-green-700">Informasi PPDB Tahun 2025/2026</h3>
      <div className="flex justify-center gap-6 mt-6">
        <div
          className="relative cursor-pointer"
          onClick={() => handleImageClick("/ppdb-1.png")}
        >
          <img
            src="/ppdb-1.png"
            alt="PPDB 1"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => handleImageClick("/ppdb-2.png")}
        >
          <img
            src="/ppdb-2.png"
            alt="PPDB 2"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Detail PPDB"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
