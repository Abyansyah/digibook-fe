'use client';

import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: [
    {
      id: number;
      name: string;
    }
  ];
  activeCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      <Button variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => onChange('all')} className="whitespace-nowrap">
        Semua
      </Button>
      {categories?.map((category, index) => (
        <Button key={index} variant={activeCategory === category?.name ? 'default' : 'outline'} onClick={() => onChange(category?.name)} className="whitespace-nowrap">
          {category?.name}
        </Button>
      ))}
    </div>
  );
}
