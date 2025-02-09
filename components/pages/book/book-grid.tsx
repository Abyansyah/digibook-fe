import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { books } from '@/types/book';

interface BookGridProps {
  books: books[];
}

export function BookGrid({ books }: BookGridProps) {
  const { push } = useRouter();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {books?.map((book) => (
        <div key={book.id} className="group">
          <div className="relative aspect-[3/4] mb-3">
            <Image src={book.image} alt={book.title} fill  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Add to favorites">
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-500">{book.categories.map((category) => category.name).join(', ')}</div>
            <h2 className="font-medium text-base line-clamp-1">{book.title}</h2>
            <div className="flex items-center gap-1">
              {/* {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
              ))} */}
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-800">{book.average_rating}</span>
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <span className="text-sm">{book.read_count} Dibaca</span>
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="text-sm">120 Kali Dibaca</div>
            </div> */} 
            <Button onClick={() => push(`/books/${book.slug}`)} variant="secondary" size="sm" className="text-xs w-full bg-primary text-white hover:bg-primary/90">
              Baca Sekarang
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
