'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { BASE_URL, fetcher } from '@/services/authClient';
import useSWR from 'swr';
import { BookReviewType } from '@/types/review-books';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { postComment } from '@/services/bookApi';

export default function ReviewDetail({ params }: { params: { slug: string } }) {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const { token } = useAuthStore();

  const { data, isLoading, error } = useSWR(`${BASE_URL}/books/${params.slug}/reviews`, fetcher);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingPost(true);
    setNewRating(0);
    setNewReview('');

    try {
      const res = await postComment(params.slug, newReview, newRating);

      if (res.success) {
        toast.success(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Gagal menambahkan ulasan');
    } finally {
      setIsFormVisible(false);
      setIsLoadingPost(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <DotLottieReact src="https://lottie.host/0d53fecd-f5f5-4f67-a651-b33f93d434cc/pT97OQp5TH.lottie" loop autoplay />
          <p className="text-xl">Memuat buku...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <DotLottieReact className="w-[20%]" src="https://lottie.host/085856a8-02a9-431b-82e2-8b82260f854f/hXwlbdL3If.lottie" loop autoplay />
        <p className="text-gray-600 text-center">Ulasan buku tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href={`/books/${params.slug}`}>
            <Button variant="outline">&larr; Kembali ke Detail Buku</Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">Semua Ulasan</h1>

        {data?.data?.list.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center">
            <DotLottieReact className="w-[40%]" src="https://lottie.host/085856a8-02a9-431b-82e2-8b82260f854f/hXwlbdL3If.lottie" loop autoplay />
            <p className="text-gray-600 text-center">Belum ada ulasan untuk buku ini.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {data?.data?.list?.map((review: BookReviewType, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
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
                    <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-y">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {isFormVisible ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-semibold">Rating:</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewRating(star)} className="focus:outline-none">
                      <Star className={`w-6 h-6 ${star <= newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} rows={3} placeholder="Tulis ulasan Anda di sini..." className="w-full" />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsFormVisible(false)}>
                  Batal
                </Button>
                <Button disabled={!newReview || !newRating || isLoadingPost} type="submit">
                  {isLoadingPost ? 'Sedang mengirim...' : 'Kirim Ulasan'}
                </Button>
              </div>
            </form>
          ) : (
            <Button
              onClick={() => {
                if (token) {
                  setIsFormVisible(true);
                } else {
                  toast.error('Anda harus login terlebih dahulu');
                }
              }}
              className="w-full"
            >
              Tulis Ulasan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
