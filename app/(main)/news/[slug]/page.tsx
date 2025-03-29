'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Calendar, ChevronLeft } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNewsStore } from '@/store/newsStore';
import parse from 'html-react-parser';

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

// export const metadata: Metadata = {
//   title: 'Literasi Digital Permudah Siswa Peroleh Sumber Belajar - DigiBook',
//   description: 'BIMA - Literasi digital banyak memberikan manfaat dalam dunia pendidikan...',
// };

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { newsDetail, loadingDetail, fetchNewsDetail } = useNewsStore();

  useEffect(() => {
    fetchNewsDetail(params.slug);
  }, [params.slug, fetchNewsDetail]);

  const content = useMemo(() => {
    if (loadingDetail) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <iframe src="https://lottie.host/embed/0d53fecd-f5f5-4f67-a651-b33f93d434cc/pT97OQp5TH.lottie"></iframe>
            <p className="text-xl">Memuat berita...</p>
          </div>
        </div>
      );
    }

    if (!newsDetail) {
      return <p className="text-muted-foreground">Berita tidak ditemukan.</p>;
    }

    return (
      <article className="space-y-8">
        <div className="space-y-4">
          <Badge>{newsDetail.category || 'Kategori Tidak Diketahui'}</Badge>
          <h1 className="text-4xl font-bold">{newsDetail.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time>{newsDetail.created_at}</time>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image src={newsDetail.image || '/default-image.jpg'} alt={newsDetail.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>

        <div className="prose prose-lg max-w-none">{parse(newsDetail.description)}</div>
      </article>
    );
  }, [loadingDetail, newsDetail]);

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8">
      <main className="mx-auto max-w-4xl py-6 space-y-8">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link href="/news">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali ke Berita
            </Link>
          </Button>
        </div>
        {content}
      </main>
    </div>
  );
}
