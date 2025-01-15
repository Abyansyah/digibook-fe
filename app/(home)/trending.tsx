import { Card, CardContent } from '@/components/ui/card';
import { books } from '@/constant/book';
import Image from 'next/image';

const TrendingSection = () => {
  return (
    <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-2xl md:text-4xl font-medium text-gray-900 mb-2 sm:mb-5">Trending Minggu Ini</h2>
          <p className="text-sm sm:text-base text-center text-gray-500 px-4 ">Merupakan daftar koleksi-koleksi trending di minggu ini, Selamat <br /> membaca.</p>
        </div>

        <div className="block sm:hidden overflow-x-auto pb-6">
          <div className="flex space-x-4 min-w-max px-2">
            {books.map((book) => (
              <Card key={book.id} className="w-48 flex-shrink-0">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] w-full">
                    <Image src={book.coverUrl} alt={book.title} fill className="object-cover rounded-t-lg" />
                  </div>
                  <div className="p-3">
                    <span className="inline-block text-xs text-blue-600 mb-1">{book.genre}</span>
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-gray-500 mb-1 line-clamp-1">{book.author}</p>
                    <p className={`text-xs font-medium ${book.price === 'Gratis' ? 'text-green-600' : 'text-gray-900'}`}>{book.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] w-full">
                  <Image src={book.coverUrl} alt={book.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                </div>
                <div className="p-3 sm:p-4">
                  <span className="inline-block text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">{book.genre}</span>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 line-clamp-1">{book.author}</p>
                  <p className={`text-xs sm:text-sm font-medium ${book.price === 'Gratis' ? 'text-green-600' : 'text-gray-900'}`}>{book.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
