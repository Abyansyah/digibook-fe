import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Star, User } from 'lucide-react';
import PublishHero from '@/public/images/publish-hero.jpg';

const trendingBooks = [
  {
    title: 'Kisah Anak Pelangi',
    author: 'Mira Lesmana',
    image: PublishHero,
    rating: 4.5,
    readers: 15000,
  },
  {
    title: 'Bumi Manusia Digital',
    author: 'Pramoedya Ananta Toer Jr.',
    image: PublishHero,
    rating: 4.7,
    readers: 20000,
  },
  {
    title: 'Laskar Algoritma',
    author: 'Andrea Hirata',
    image: PublishHero,
    rating: 4.6,
    readers: 18000,
  },
  {
    title: 'Filosofi Kopi Daring',
    author: 'Dewi Lestari',
    image: PublishHero,
    rating: 4.4,
    readers: 12000,
  },
];

export default function TrendingBooks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Buku Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingBooks.map((book, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <Image src={book.image} alt={book.title} width={200} height={300} className="w-full object-cover h-64" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{book.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm">{book.readers.toLocaleString()} pembaca</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
