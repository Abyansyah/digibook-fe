'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Book as BookIcon, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { BASE_URL, fetcher } from '@/services/authClient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  date: string;
  last_page: number;
  page_count: number;
  slug: string;
  presentase: string;
  image: string;
  author: string;
}

interface BooksResponse {
  data: Book[];
}

export default function ReadingHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'completed'>('all');

  const { data, error } = useSWR<BooksResponse>(`${BASE_URL}/dashboard/book?tab=${filter}`, fetcher);

  if (error) return <div>Error loading books.</div>;

  const books: Book[] = data?.data || [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reading History</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>
            All Books
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilter('completed')}>
            Completed Books
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {books.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{!data ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />) : books.map((book) => <BookCard key={book.id} book={book} />)}</div>
      ) : (
        <div className="flex justify-center ">
          <div className="flex flex-col items-center justify-center">
            <iframe className="w-60 h-60 mb-6" src="https://lottie.host/embed/25b433c0-c82b-4fa7-a51e-f63826a954e4/HEEbrJ7g7z.lottie"></iframe>
            <h2 className="font-semibold text-xl text-center">Wahh, {filter === 'completed' ? 'kamu belum ada buku yang selesai' : 'kamu belum membaca buku'} sama sekali nih!!</h2>
            <p className="mb-6">Yuk {filter === 'completed' ? 'Yuk Selesaikan buku sekarang dan dapatkan poin' : 'Baca buku sekarang dan dapatkan poin'} poin!</p>
            {filter === 'all' && (
              <Link href={'/event'}>
                <Button>Ikut Event Sekarang!</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const progress = parseFloat(book.presentase);
  const isCompleted = book.last_page === book.page_count;

  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex mb-4">
        <div className="w-20 h-30 mr-4 flex-shrink-0">
          <Image src={book.image} alt={`Cover of ${book.title}`} width={300} height={400} className="w-full h-full object-cover rounded" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          {/* <p className="text-sm text-gray-600 mb-2">Read on: {new Date(book.date).toLocaleDateString()}</p> */}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <BookIcon className="w-4 h-4 mr-1" />
            <span>
              {book.last_page} / {book.page_count} pages
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Last read: {book?.date}</p>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        {isCompleted && (
          <div className="flex items-center justify-end mt-2 text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </div>
      {!isCompleted && (
        <Link href={`/reading/${book.slug}`} className="flex items-center justify-end mt-2 text-gray-600">
          <Button variant={'default'} className="h-8">
            Lanjutkan Membaca
          </Button>
        </Link>
      )}
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card className="p-6 flex flex-col h-full animate-pulse">
      <div className="flex mb-4">
        <div className="w-20 h-30 mr-4 flex-shrink-0 bg-gray-300"></div>
        <div className="flex-grow space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
      <div className="mt-auto space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </Card>
  );
}
