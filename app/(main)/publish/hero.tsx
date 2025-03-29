'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PublishHero from '@/public/images/publish-hero.jpg';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const { push } = useRouter();
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
      <div className="container max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Terbitkan Bukumu dengan Mudah</h1>
          <p className="text-xl mb-8">Platform penerbitan buku yang memudahkan penulis untuk menerbitkan dan menjual karya mereka secara global.</p>
          <Button onClick={() => push('/dashboard/publishing')} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Mulai Sekarang
          </Button>
        </div>
        <div className="grid min-h-[140px] md:w-1/2 place-items-center overflow-x-scroll rounded-lg   lg:overflow-visible">
          <Image src={PublishHero.src} alt="Ilustrasi Buku" width={400} height={400} className="object-cover object-center w-full rounded-lg h-96" />
        </div>
      </div>
    </section>
  );
}
