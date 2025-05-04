import React from "react";
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaFacebook, FaInstagram, FaWhatsapp,
  FaTiktok, FaYoutube
} from "react-icons/fa";

export default function FooterUniversity() {
  return (
    <div className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kontak Utama */}
        <div>
          <h2 className="text-green-400 font-bold text-lg mb-4">MI Ma'arif Nailul Huda</h2>
          <p className="flex gap-2 items-start">
            <FaMapMarkerAlt className="text-green-500 mt-1" />
            <a
              href="https://maps.app.goo.gl/xDTYfAfi8a6YDPnX9"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Bonsari, Garum, Kec. Garum, Kabupaten Blitar, Jawa Timur 66182
            </a>
          </p>
          <p className="flex gap-2 items-center mt-2">
  <FaEnvelope className="text-green-500" />
  <a
  href="mailto:mimaarifnailulhuda@gmail.com?subject=Informasi%20PPDB"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-white"
>
  mimaarifnailulhuda@gmail.com
</a>

</p>

        </div>

        {/* Kontak WhatsApp */}
        <div>
          <h2 className="text-green-400 font-bold text-lg mb-4">Hubungi via WhatsApp</h2>
          <div className="space-y-3">
            {[
              { name: "Elok Nur Afidah", number: "6285645051776" },
              { name: "Mustaftichatull", number: "6281555993880" },
              { name: "Dewi Fatihatul", number: "6281234663695" }
            ].map((contact, index) => (
              <a
                key={index}
                href={`https://wa.me/${contact.number}?text=Halo%20saya%20ingin%20bertanya`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow hover:text-white"
              >
                <FaWhatsapp className="text-green-500 mr-3" />
                <span><strong>{contact.name}:</strong> +{contact.number}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Media Sosial */}
        <div>
          <h2 className="text-green-400 font-bold text-lg mb-4">Media Sosial</h2>
          <div className="space-y-3">
            <a href="https://www.facebook.com/profile.php?id=61572282390905" className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow hover:text-white">
              <FaFacebook className="text-blue-600 mr-3" /> Facebook
            </a>
            <a href="https://www.instagram.com/mimaarifnailulhuda" className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow hover:text-white">
              <FaInstagram className="text-pink-500 mr-3" /> Instagram
            </a>
            <a href="https://www.tiktok.com/@mi.manada.garum" className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow hover:text-white">
              <FaTiktok className="text-white mr-3" /> TikTok
            </a>
            <a href="https://youtube.com/@nailulhuda7150" className="flex items-center bg-gray-700 px-4 py-2 rounded-lg shadow hover:text-white">
              <FaYoutube className="text-red-600 mr-3" /> YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bawah */}
      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-4">
        <p className="text-white font-semibold">© 2025 MI Ma'arif Nailul Huda</p>
        <p className="text-sm italic">"Mendidik generasi islami yang cerdas dan berkarakter"</p>
      </div>
    </div>
  );
}
