import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

const HeroSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="flex justify-between gap-y-10 flex-col md:flex-row items-center">
        <div className="space-y-6 w-full md:w-1/2">
          <h1 className="text-4xl font-semibold text-center text-gray-900 md:text-5xl lg:text-6xl md:text-start" style={{ lineHeight: 1.2 }}>
            Inovasi Literasi Digital untuk <span className="text-primary">Masa Depan.</span>
          </h1>
          <p className="text-base text-gray-600 text-center leading-relaxed tracking-wider md:text-start">
            DigiBook, tempatmu membaca, menulis, dan melaporkan berita hoaks! Dengan fitur penerbitan buku, event seru, dan edukasi digital, kami hadir untuk menjadikan literasi lebih menyenangkan dan bermanfaat. Mulai
            perjalananmu sekarang!
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-8">
            <Button variant={'ghost'} size="lg" className="px-8 border border-primary text-primary hover:bg-primary hover:text-white">
              Explore More
              <Icon icon={'solar:arrow-right-linear'} className="text-3xl" />
            </Button>
            <button className=" p-4 rounded-full text-primary text-2xl border border-primary hover:bg-primary hover:text-white transition duration-1000 ease-in-out animate-pulse">
              <Icon icon={'ci:play'} />
            </button>
          </div>
        </div>
        <div className="relative h-[400px] w-full md:h-[500px] md:w-[520px] ">
          <Image src="/assets/heroSection1.svg" alt="Hero image" width={600} height={400} className="w-full" />
          <Image src="/assets/heroEarth.svg" alt="Earth image" width={80} height={80} className="absolute w-14 h-14 md:w-20 md:h-20 top-[14%] md:top-[18%] right-[30%] animate-MoveUpDown" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
