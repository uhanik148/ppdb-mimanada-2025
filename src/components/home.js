import { useRouter } from 'next/router';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="bg-green-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6">
        {/* Left content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">PPDB</h2>
          <h1 className="text-4xl font-bold mb-6">MI MA'ARIF NAILUL HUDA</h1>
          
          <p className="text-lg mb-8">
            Mari Wujudkan Masa Depan Cerah Buah Hati Anda Bersama MI MAA'RIF NAILUL HUDA!       
            Bentuk akhlak mulia, asah kecerdasan, dan tumbuhkan semangat belajar dalam lingkungan yang islami, nyaman, dan penuh kasih.
          </p>
          
          <button
            onClick={() => router.push('/pengumuman')}
            className="bg-amber-700 hover:bg-amber-800 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Lihat Informasi
          </button>
        </div>
        
        {/* Right image */}
        <div className="md:w-1/2">
        <img 
  src="/IMG-20250425-WA0022-removebg-preview.png" 
  alt="Siswa MI Ma'arif Nailul Huda" 
  className="max-w-full rounded-lg object-contain md:object-cover mx-auto"
/>


        </div>
      </div>
    </section>
  );
}
