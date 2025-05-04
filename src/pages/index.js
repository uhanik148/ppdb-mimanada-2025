import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Home from '../components/home';
import About from '../components/about';
import Facilities from '../components/facilities';
import ModalImage from "react-modal-image";
import Pendaftaran from '../components/pendaftaran';
import Infoppdb from '../components/infoppdb';
import Faq from '../components/faq';

export default function HomePage() {
  return (
    <div className="bg-green-100 text-gray-800">
      <Head>
        <title>PPDB MI MAA'RIF NAILUL HUDA</title>
        <meta name="description" content="Website resmi PPDB MI MAA'RIF NAILUL HUDA" />
      </Head>

      {/* Content Sections */}
      <Home />
      <About />
      <Facilities />
      <Pendaftaran />
      <Infoppdb />
      <Faq />
  
      </div>
  );
}