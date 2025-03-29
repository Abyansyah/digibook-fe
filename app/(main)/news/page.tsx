'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { NewsCard } from '@/components/pages/news/card-detail';
import { NewsCarousel } from '@/components/pages/news/news-carousel';
import { CategoryFilter } from '@/components/pages/news/category-filter';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { debounce } from '@/lib/utils';
import useSWR from 'swr';
import { fetchNews, fetchNewsBanner, getNewsCategory } from '@/services/newsApi';
import NewsCardSkeletonBanner from '@/components/pages/news/news-card-skeleton-banner';
import { NewsEmptyState } from './empty-state-banner';
import { NewsArticle } from '@/types/news';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: newsBanner, isLoading: loadingBanner } = useSWR('news-banner', fetchNewsBanner);
  const { data: newsCategory } = useSWR('news-category', getNewsCategory);

  const { data: news = [], isLoading: loading } = useSWR(['news', searchTerm, activeCategory], () => fetchNews({ search: searchTerm, category: activeCategory === 'all' ? undefined : activeCategory }));

  const debouncedSetSearchTerm = useMemo(() => debounce((term) => setSearchTerm(term), 500), []);

  const handleSearch = (term?: string) => {
    debouncedSetSearchTerm(term);
  };

  const filteredNews = news?.list?.filter((item: NewsArticle) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <main className="container py-6 space-y-8">
          {loadingBanner ? <NewsCardSkeletonBanner /> : newsBanner?.list?.length > 0 ? <NewsCarousel items={newsBanner?.list} /> : <NewsEmptyState />}

          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="search" placeholder="Cari berita..." className="pl-10 max-w-xl" onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <CategoryFilter categories={newsCategory} activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground">Memuat berita...</div>
          ) : filteredNews?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews?.map((item: NewsArticle, index: number) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <iframe className="w-60 h-60 mb-6" src="https://lottie.host/embed/25b433c0-c82b-4fa7-a51e-f63826a954e4/HEEbrJ7g7z.lottie"></iframe>
                <h2 className="font-semibold text-xl text-center">Yahh berita yang kamu cari tidak ada</h2>
                <p className="mb-6">Coba cari dengan kata kunci yang lain</p>
              </div>
            </div>
          )}

          {filteredNews?.length > 9 && (
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
