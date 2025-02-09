'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

export function RelatedBooks({ books }: { books: Book[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const visibleBooks = 4;

  useEffect(() => {
    setIsAtStart(startIndex === 0);
    setIsAtEnd(startIndex + visibleBooks >= books.length);
  }, [startIndex, books.length]);

  const nextSlide = () => {
    if (!isAtEnd) {
      setStartIndex((prevIndex) => Math.min(prevIndex + 1, books.length - visibleBooks));
    }
  };

  const prevSlide = () => {
    if (!isAtStart) {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Buku Terkait</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} disabled={isAtStart}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} disabled={isAtEnd}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${startIndex * 25}%)` }}>
          {books.map((book) => (
            <div key={book.id} className="flex-none w-1/4 px-2">
              <div className="relative aspect-[3/4] mb-3">
                <Image src={book.coverUrl || '/placeholder.svg'} fill alt={book.title} className="rounded-lg object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold mb-1 truncate">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
