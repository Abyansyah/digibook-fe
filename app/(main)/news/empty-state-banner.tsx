import Image from 'next/image';
import EmptyImage from '@/public/images/news-empty-state.jpg';

export function NewsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Image src={EmptyImage.src} alt="No news available " width={400} height={400} />
      <h2 className="text-2xl font-semibold mt-4">Tidak Ada Berita</h2>
      <p className="text-gray-500 mt-2">Saat ini belum ada berita yang tersedia. Silakan cek kembali nanti.</p>
    </div>
  );
}
