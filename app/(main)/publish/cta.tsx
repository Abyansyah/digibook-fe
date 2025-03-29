'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CTA() {
  const { push } = useRouter();
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Menerbitkan Bukumu?</h2>
        <p className="text-xl mb-8">Bergabunglah dengan ribuan penulis yang telah sukses menerbitkan karya mereka.</p>
        <Button onClick={() => push('/dashboard/publishing')} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Daftar Sekarang
        </Button>
      </div>
    </section>
  );
}
