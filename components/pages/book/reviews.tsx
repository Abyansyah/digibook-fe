import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { BookReviewType } from '@/types/review-books';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export function Reviews({ reviews, bookId }: { reviews: BookReviewType[]; bookId: string }) {
  const displayedReviews = reviews?.slice(0, 3);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Ulasan</h2>
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>{review.user.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{review.user}</h3>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">{review.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reviews?.length > 0 && (
        <div className="mt-6">
          <Link href={`/books/${bookId}/reviews`}>
            <Button variant="outline" className="w-full">
              Lihat Semua Ulasan
            </Button>
          </Link>
        </div>
      )}

      {reviews?.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center">
          <DotLottieReact className="w-[40%]" src="https://lottie.host/085856a8-02a9-431b-82e2-8b82260f854f/hXwlbdL3If.lottie" loop autoplay />
          <p className="text-gray-600 text-center">Belum ada ulasan untuk buku ini.</p>
          <Link href={`/books/${bookId}/reviews`}>
            <Button variant="outline" className=" mt-4">
              Buat Ulasan
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
