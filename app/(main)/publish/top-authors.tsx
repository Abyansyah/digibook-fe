'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Book } from 'lucide-react';

const topAuthors = [
  { name: 'Tere Liye', rating: 4.9, image: 'https://idwriters.com/wp-content/uploads/2018/06/tl01.png', publishedBooks: 25 },
  { name: 'Ahmad Fuadi', rating: 4.8, image: 'https://cdn.gramedia.com/uploads/authors/Fuadi-twitter_GlGjsA7.jpg', publishedBooks: 18 },
  { name: 'Dee Lestari', rating: 4.7, image: 'https://bukunesia.com/wp-content/uploads/2023/07/Biografi-Dee-Lestari.jpeg', publishedBooks: 22 },
  { name: 'Nadhifa Allya Tsana', rating: 4.6, image: 'https://thephrase.s3.ap-southeast-1.amazonaws.com/2022/03/83132866_115212303223821_7707403240727104436_n.jpg', publishedBooks: 15 },
  { name: 'Andrea Hirata', rating: 4.8, image: 'https://cdn.gramedia.com/uploads/authors/hirata_-_mr_andrea_hirata_-_photo_from_him_27march15.jpg', publishedBooks: 20 },
  { name: 'Raditya Dika', rating: 4.5, image: 'https://qubisastorage.blob.core.windows.net/files/profiles/17060/img300/17060-20210317104052321.jpg', publishedBooks: 12 },
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
