'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { NewsCard } from '@/components/pages/news/card-detail';
import { NewsCarousel } from '@/components/pages/news/news-carousel';
import { CategoryFilter } from '@/components/pages/news/category-filter';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { debounce } from '@/lib/utils';
import { useNewsStore } from '@/store/newsStore';
import { NewsArticle } from '@/types/news';
import NewsCardSkeletonBanner from '@/components/pages/news/news-card-skeleton-banner';

export default function NewsPage() {
  const { news, newsBanner, loadingBanner, loading, fetchNews, fetchNewsBanner } = useNewsStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const categories = ['Pendidikan', 'Tips', 'Edukasi', 'Berita'];

  useEffect(() => {
    fetchNewsBanner();
  }, [fetchNewsBanner]);

  useEffect(() => {
    const category = activeCategory === 'all' ? undefined : activeCategory;
    fetchNews({ search: searchTerm, category });
  }, [searchTerm, activeCategory, fetchNews]);

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((term) => {
        setSearchTerm(term);
      }, 500),
    []
  );

  const handleSearch = (term?: string) => {
    debouncedSetSearchTerm(term);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered: any = news.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredNews(filtered);
  }, [news, activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <main className="container py-6 space-y-8">
          {loadingBanner ? <NewsCardSkeletonBanner /> : <NewsCarousel items={newsBanner} />}

          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="search" placeholder="Cari berita..." className="pl-10 max-w-xl" onChange={(e) => handleSearch(e.target.value)} />
            </div>

            <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground">Memuat berita...</div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item: NewsArticle, index: number) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">Tidak ada berita yang sesuai dengan pencarian Anda.</div>
          )}

          {filteredNews.length > 9 && (
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
