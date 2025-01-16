'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { NewsCard } from '@/components/news-card';
// Sample news data
const newsItems = [
  {
    id: 1,
    title: 'New Breakthrough in Renewable Energy',
    excerpt: 'Scientists have discovered a new method to harness solar energy with unprecedented efficiency.',
    category: 'Technology',
    date: '2023-05-15',
    imageUrl: 'https://assets.skilvul.com/blog/6-bahasa-pemrograman-populer-yang-wajib-dipelajari-pemula-1735798477827.png',
  },
  {
    id: 2,
    title: 'Global Economic Forum Addresses Climate Change',
    excerpt: 'World leaders gather to discuss economic strategies to combat climate change.',
    category: 'Politics',
    date: '2023-05-14',
    imageUrl: 'https://assets.skilvul.com/blog/6-bahasa-pemrograman-populer-yang-wajib-dipelajari-pemula-1735798477827.png',
  },
  {
    id: 3,
    title: 'Breakthrough in Artificial Intelligence',
    excerpt: 'A new AI model shows human-like reasoning capabilities, marking a significant milestone in AI research.',
    category: 'Technology',
    date: '2023-05-13',
    imageUrl: 'https://assets.skilvul.com/blog/6-bahasa-pemrograman-populer-yang-wajib-dipelajari-pemula-1735798477827.png',
  },
  {
    id: 4,
    title: 'Major Archaeological Discovery in Egypt',
    excerpt: 'Archaeologists uncover an ancient tomb believed to belong to a previously unknown pharaoh.',
    category: 'History',
    date: '2023-05-12',
    imageUrl: 'https://assets.skilvul.com/blog/6-bahasa-pemrograman-populer-yang-wajib-dipelajari-pemula-1735798477827.png',
  },
  {
    id: 5,
    title: 'Advancements in Cancer Treatment',
    excerpt: 'A new immunotherapy shows promising results in early-stage clinical trials for multiple types of cancer.',
    category: 'Health',
    date: '2023-05-11',
    imageUrl: 'https://assets.skilvul.com/blog/6-bahasa-pemrograman-populer-yang-wajib-dipelajari-pemula-1735798477827.png',
  },
  {
    id: 6,
    title: 'Space Tourism Takes Off',
    excerpt: 'The first commercial space flight with tourists aboard successfully completes its maiden voyage.',
    category: 'Science',
    date: '2023-05-10',
    imageUrl: 'https://assets.skilvul.com/blog/6-bahasa-pemrograman-populer-yang-wajib-dipelajari-pemula-1735798477827.png',
  },
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsItems.filter(
    (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Berita Terkini</h1>
        <div className="mb-8">
          <Input type="search" placeholder="Search news..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-md mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} title={item.title} excerpt={item.excerpt} category={item.category} date={item.date} imageUrl={item.imageUrl} />
          ))}
        </div>
        {filteredNews.length === 0 && <p className="text-center text-muted-foreground mt-8">No news items found matching your search.</p>}
      </div>
    </div>
  );
}
