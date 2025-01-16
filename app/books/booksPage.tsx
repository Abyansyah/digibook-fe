'use client';

import { useState, useEffect } from 'react';
import { Star, Heart, Grid2X2, List, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FilterContent } from './Filter';

export default function BookStore() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const editorPicks = ['Best Sellers', 'Most Commented', 'Newest Books', 'Featured'];
  const publishers = ['Penguin', 'HarperCollins', 'Random House', 'Simon & Schuster'];
  const years = ['2024', '2023', '2022', '2021'];
  const categories = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-fi', 'Sport'];

  const books = [
    { id: 1, title: 'Thunder Stunt', categories: ['ADVENTURE', 'SCIENCE', 'COMEDY'], price: 54.78, rating: 5 },
    { id: 2, title: 'Mystic Journey', categories: ['FANTASY', 'ADVENTURE'], price: 42.99, rating: 4 },
    { id: 3, title: 'Code Masters', categories: ['SCIENCE', 'TECHNOLOGY'], price: 39.99, rating: 5 },
    { id: 4, title: 'Starlight Saga', categories: ['SCI-FI', 'ADVENTURE'], price: 47.5, rating: 4 },
    { id: 5, title: 'Laugh Out Loud', categories: ['COMEDY'], price: 29.99, rating: 3 },
    { id: 6, title: 'Mystery Manor', categories: ['MYSTERY', 'THRILLER'], price: 36.75, rating: 4 },
    { id: 7, title: 'Historical Echoes', categories: ['HISTORY', 'DRAMA'], price: 51.2, rating: 5 },
    { id: 8, title: 'Future Tech', categories: ['SCIENCE', 'TECHNOLOGY'], price: 45.0, rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className={`md:hidden ${isScrolled ? 'fixed top-[4.5rem] left-0 right-0 z-10 bg-white p-4 shadow-md' : ''}`}>
            <div className="relative mb-4">
              <input type="text" placeholder="Search over 30 million book titles" className="w-full px-4 py-2 border rounded-lg" />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterContent editorPicks={editorPicks} publishers={publishers} years={years} categories={categories} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <aside className="hidden md:block w-64">
            <FilterContent editorPicks={editorPicks} publishers={publishers} years={years} categories={categories} />
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex-1 max-w-xl hidden md:block">
                <div className="relative">
                  <input type="text" placeholder="Search over 30 million book titles" className="w-full px-4 py-2 border rounded-lg" />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : ''}`} onClick={() => setViewMode('grid')}>
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : ''}`} onClick={() => setViewMode('list')}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <select className="p-2 border rounded-lg">
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6' : 'space-y-4'}>
              {books.map((book) => (
                <div key={book.id} className={`group ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
                  <div className={`relative ${viewMode === 'grid' ? 'aspect-[3/4]' : 'w-24 h-36'} rounded-lg overflow-hidden mb-3`}>
                    <Image
                      src={'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bookoe%20-%20Book%20Store%20Website%20UI%20Design%20Figma%20Template-2.jpg-bqEg6W5PGfiVFvPzh6RScABuMDEI3D.jpeg'}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className={`space-y-2 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">{book.categories.join(', ')}</div>
                    <h3 className="font-semibold truncate">{book.title}</h3>
                    <div className="flex gap-1">
                      {[...Array(book.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className="font-semibold">${book.price.toFixed(2)}</div>
                      <Button size="sm" variant="outline">
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              <Button variant="outline">Previous</Button>
              <Button variant="default" className="bg-primary">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
