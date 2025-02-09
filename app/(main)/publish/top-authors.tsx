'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Book } from 'lucide-react';
import SampleIMG from '@/public/images/sample-comment.jpg'

const topAuthors = [
  { name: 'Tere Liye', rating: 4.9, image: SampleIMG, publishedBooks: 25 },
  { name: 'Eka Kurniawan', rating: 4.8, image: SampleIMG, publishedBooks: 18 },
  { name: 'Dee Lestari', rating: 4.7, image: SampleIMG, publishedBooks: 22 },
  { name: 'Leila S. Chudori', rating: 4.6, image: SampleIMG, publishedBooks: 15 },
  { name: 'Andrea Hirata', rating: 4.8, image: SampleIMG, publishedBooks: 20 },
  { name: 'Faisal Oddang', rating: 4.5, image: SampleIMG, publishedBooks: 12 },
];

export default function TopAuthors() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Penulis dengan Rating Tertinggi</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent>
            {topAuthors.map((author, index) => (
              <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-between p-4 h-full">
                      <Image src={author.image} alt={author.name} width={120} height={120} className="rounded-full mb-4 w-20 h-20 object-cover" />
                      <h3 className="font-semibold text-lg text-center mb-2">{author.name}</h3>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="sr-only">Rating:</span>
                        <span>{author.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Book className="w-4 h-4 text-blue-500 mr-1" />
                        <span>{author.publishedBooks} buku</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
