import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { books } from '@/types/book';

interface BookListProps {
  books: books[];
}

export function BookList({ books }: BookListProps) {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex gap-6">
            <div className="relative w-[140px] h-[200px] flex-shrink-0">
              <Image src={book.image} alt={book.title} fill className="object-cover rounded-lg"  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors" aria-label="Add to favorites">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{book.categories.map((category) => category.name).join(', ')}</div>
                <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < book.average_rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{book.average_rating}.0</span>
                    <span className="text-sm text-gray-500">(86 Reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">{book.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{book.author}</span>
                <span>•</span>
                <span>{book.publisher}</span>
                <span>•</span>
                <span>{book.publication_year}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  {/* <div className="text-2xl font-bold">${book.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500 line-through">${(book.price * 1.2).toFixed(2)}</div> */}
                </div>
                <div className="flex items-center gap-3">
                  {/* <Button variant="outline" className="text-sm">
                    See 25% Discount
                  </Button> */}
                  <Button className="bg-primary hover:bg-primary/90">Baca Sekarang</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
