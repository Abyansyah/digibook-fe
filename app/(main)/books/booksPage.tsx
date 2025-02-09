'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FilterContent } from './Filter';
import { ViewToggle } from '@/components/pages/book/view-toogle';
import { BookGrid } from '@/components/pages/book/book-grid';
import { BookList } from '@/components/pages/book/book-list';
import { updateURLParams } from '@/lib/url-params';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchBooks } from '@/services/bookApi';
import { Input } from '@/components/ui/input';
import SkeletonCard from '@/components/loading-card';
import { debounce } from '@/lib/utils';
import LoadingSkeleton from '@/components/pages/book/loading-skeleton-list';

export default function BookStore() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBooksFromApi = async () => {
    setLoading(true);

    const query = {
      search: searchParams.get('search') || '',
      book_category: searchParams.get('category') || '',
      page: parseInt(searchParams.get('page') || '1'),
      limit: 12,
    };

    try {
      const { data } = await fetchBooks(query);
      setBooks(data?.list);
      setTotalPages(data?.meta.total_pages);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleFiltersChange = useMemo(
    () =>
      debounce((updates: Record<string, string>) => {
        const queryString = updateURLParams(searchParams, updates);
        router.push(queryString ? `/books/?${queryString}` : '/books');
      }, 1000),
    [searchParams, router]
  );

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((term) => {
        setSearch(term);
      }, 1000),
    []
  );

  const handleSearch = (term: string) => {
    debouncedSetSearchTerm(term);
  };

  const handleFiltersChange = (updates: Record<string, string>) => {
    debouncedHandleFiltersChange(updates);
  };

  useMemo(() => {
    fetchBooksFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className={`md:hidden ${isScrolled ? 'fixed top-[4.5rem] left-0 right-0 z-10 bg-white p-4 shadow-md' : ''}`}>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-lg"
                value={search}
                onChange={(e) => {
                  handleSearch(e.target.value);
                  handleFiltersChange({ search: e.target.value });
                }}
              />
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
                  <FilterContent
                    selectedCategories={selectedCategories}
                    onChange={(updatedCategories) => {
                      setSelectedCategories(updatedCategories);
                      handleFiltersChange({ category: updatedCategories.join(',') });
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <aside className="hidden md:block w-64 h-screen">
            <FilterContent
              selectedCategories={selectedCategories}
              onChange={(updatedCategories) => {
                setSelectedCategories(updatedCategories);
                handleFiltersChange({ category: updatedCategories.join(',') });
              }}
            />
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex-1 max-w-xl hidden md:block">
                <div className="relative">
                  <Input
                    placeholder="Search over 30 million book titles"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      handleFiltersChange({ search: e.target.value });
                    }}
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ViewToggle view={viewMode} onViewChange={setViewMode} />
                <select className="p-2 border rounded-lg" onChange={(e) => handleFiltersChange({ sort: e.target.value })}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {loading && viewMode === 'grid' ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 10 }, (_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </>
            ) : loading && viewMode === 'list' ? (
              <>
                {Array.from({ length: 10 }, (_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </>
            ) : viewMode === 'grid' ? (
              <>
                <BookGrid books={books} />
              </>
            ) : (
              <>
                <BookList books={books} />
              </>
            )}

            <div className="flex justify-center items-center gap-2 mt-8">
              <Button variant="outline" onClick={() => handleFiltersChange({ page: String(currentPage - 1) })} disabled={currentPage === 1}>
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} variant={currentPage === i + 1 ? 'default' : 'outline'} onClick={() => handleFiltersChange({ page: String(i + 1) })}>
                  {i + 1}
                </Button>
              ))}

              <Button variant="outline" onClick={() => handleFiltersChange({ page: String(currentPage + 1) })} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
