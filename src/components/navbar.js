import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center">
        <Image src="/Logo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-xl font-extrabold ml-3 text-green-700 tracking-wide">
          MI MA'ARIF NAILUL HUDA
        </h1>
      </div>

      <nav>
        <ul className="flex space-x-6 font-medium text-gray-700">
          <li className="hover:text-green-600 transition duration-200">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-green-600 transition duration-200">
            <Link href="/infolanjut">Profil Kami</Link>
          </li>
          <li className="hover:text-green-600 transition duration-200">
            <Link href="/oneday">Info Pendaftaran</Link>
          </li>
          <li>
            <Link
              href="/pendaftaran"
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition duration-300 font-semibold"
            >
              Pendaftaran
            </Link>
          </li>
          <li>
            <Link
              href="/admin/login"
              className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-900 transition duration-300 font-semibold"
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
