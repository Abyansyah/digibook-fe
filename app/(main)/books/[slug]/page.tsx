'use client';

import { useEffect, useState } from 'react';
import { Star, BookOpen, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RelatedBooks } from '@/components/pages/book/related-book';
import { Reviews } from '@/components/pages/book/reviews';
import Image from 'next/image';
import { useBookStore } from '@/store/bookStore';
import { useRouter } from 'next/navigation';
import { readBook } from '@/services/bookApi';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const relatedBooks = [
  { id: 1, title: 'Manusia Setengah Salmon', author: 'Raditya Dika', coverUrl: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9789797808990_Koala-Kumal-Edisi-Revisi.jpg' },
  { id: 2, title: 'Marmut Merah Jambu', author: 'Raditya Dika', coverUrl: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9789797808990_Koala-Kumal-Edisi-Revisi.jpg' },
  { id: 3, title: 'Ubur-Ubur Lembur', author: 'Raditya Dika', coverUrl: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9789797808990_Koala-Kumal-Edisi-Revisi.jpg' },
  { id: 4, title: 'Cinta Brontosaurus', author: 'Raditya Dika', coverUrl: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9789797808990_Koala-Kumal-Edisi-Revisi.jpg' },
  { id: 5, title: 'Radikus Makankakus', author: 'Raditya Dika', coverUrl: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9789797808990_Koala-Kumal-Edisi-Revisi.jpg' },
];

export default function BookDetail({ params }: { params: { slug: string } }) {
  const [isLiked, setIsLiked] = useState(false);

  const { bookDetail, bookReview, loading, loadingReview, fetchBookDetail, fetchBookReview } = useBookStore();

  const { token } = useAuthStore();

  const [loadingRead, setLoadingRead] = useState<boolean>(false);

  useEffect(() => {
    if (params.slug) {
      fetchBookDetail(params.slug);
      fetchBookReview(params.slug);
    }
  }, [params.slug, fetchBookDetail, fetchBookReview]);

  const router = useRouter();

  const handleReadBook = async () => {
    setLoadingRead(true);
    try {
      const res = await readBook(bookDetail?.slug, 1);
      console.log(res);
      if (res.success) {
        setTimeout(() => {
          setLoadingRead(false);
          router.push(`/reading/${params.slug}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Gagal membaca buku');
    }
  };

  if (loading || loadingReview) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <DotLottieReact src="https://lottie.host/0d53fecd-f5f5-4f67-a651-b33f93d434cc/pT97OQp5TH.lottie" loop autoplay />
          <p className="text-xl">Memuat buku...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
            <div className="relative w-64">
              <Image src={bookDetail?.image || '/images/publish-hero.jpg'} alt="Book Cover" width={300} height={450} className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl" />
              <Button variant="outline" size="icon" className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{bookDetail?.title}</h1>
              <p className="text-gray-600 text-lg">{bookDetail?.author}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-semibold">{bookDetail?.average_rating}</span>
                <span className="ml-1 text-gray-600">({bookDetail?.review_count} ulasan)</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="ml-1 text-gray-600">{bookDetail?.read_count} Dibaca</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {bookDetail?.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category.name}
                </Badge>
              ))}
              <Badge variant="secondary">{bookDetail?.language}</Badge>
            </div>

            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold mb-2">Tentang Buku</h3>
              <p className="text-gray-600">{bookDetail?.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  if (token && bookDetail?.last_page === null) {
                    handleReadBook();
                  } else {
                    router.push(`/reading/${params.slug}`);
                  }
                }}
                className="flex-1"
                size="lg"
                disabled={loadingRead}
              >
                Baca Sekarang
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="w-5 h-5 mr-2" />
                Bagikan
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Detail</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="text-gray-600">Penerbit</dt>
                  <dd className="font-medium">{bookDetail?.publisher}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Tahun Terbit</dt>
                  <dd className="font-medium">{bookDetail?.publication_year}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Jumlah Halaman</dt>
                  <dd className="font-medium">{bookDetail?.page_count}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Bahasa</dt>
                  <dd className="font-medium">{bookDetail?.language}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <RelatedBooks books={relatedBooks} />
        <Reviews reviews={bookReview || []} bookId={params.slug} />
      </main>
    </div>
  );
}
