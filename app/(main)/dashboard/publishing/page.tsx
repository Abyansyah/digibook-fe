'use client';

import { BookPlus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import useSWR from 'swr';
import { getAllPublish } from '@/services/publishApi';
import { PublishedBookCardSkeleton } from './publish-book-loading-card';
import { PublishedBookCard } from './publish-book-card';

type book = {
  id: number;
  title: string;
  author: string;
  image: string;
  publishDate: string;
  page_count: number;
  salesCount: number;
  status: string;
};
export default function PublishingPage() {
  const { data, isLoading } = useSWR('get-all-publish', getAllPublish);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Book Publishing</h1>
        <Button asChild>
          <Link href="/dashboard/publishing/new">Start Publishing</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <PublishedBookCardSkeleton key={index} />
          ))}
        </div>
      ) : data?.data?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((book: book) => (
            <PublishedBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none">
          <CardContent className="flex flex-col items-center text-center p-12">
            <BookPlus className="h-16 w-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Share Your Ideas With Us</h2>
            <p className="text-gray-600 mb-6 max-w-md">Turn your ideas into a published book. Our platform makes it easy to share your knowledge with the world.</p>
            <Button asChild size="lg">
              <Link href="/dashboard/publishing/new" className="flex items-center">
                Start Your Publishing Journey
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
