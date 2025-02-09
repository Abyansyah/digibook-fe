'use client';

import { useState, useEffect } from 'react';
import { NewsHero } from './news-hero';

interface NewsItem {
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
}

interface NewsCarouselProps {
  items: NewsItem[];
}

export function NewsCarousel({ items }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  return <NewsHero {...items[currentIndex]} />;
}
