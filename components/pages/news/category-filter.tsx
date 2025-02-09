'use client';

import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      <Button variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => onChange('all')} className="whitespace-nowrap">
        Semua
      </Button>
      {categories.map((category) => (
        <Button key={category} variant={activeCategory === category ? 'default' : 'outline'} onClick={() => onChange(category)} className="whitespace-nowrap">
          {category}
        </Button>
      ))}
    </div>
  );
}
