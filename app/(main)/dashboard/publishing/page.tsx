'use client';

import { BookPlus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const publishedBooks = [
  // Add published books here if any
];

export default function PublishingPage() {
  const hasPublishedBooks = publishedBooks.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Book Publishing</h1>
        <Button asChild>
          <Link href="/dashboard/publishing/new">Start Publishing</Link>
        </Button>
      </div>

      {!hasPublishedBooks ? (
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
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* {publishedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))} */}
        </div>
      )}
    </div>
  );
}

// ... BookCard component (if any) remains the same
