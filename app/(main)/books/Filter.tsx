// FilterContent.tsx

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { BASE_URL, fetcher } from '@/services/authClient';
import useSWR from 'swr';

type FilterContentProps = {
  selectedCategories?: string[];
  onChange?: (updatedCategories: string[]) => void;
};

type CategoryFilterProps = {
  id: number;
  name: string;
};

export function FilterContent({ selectedCategories = [], onChange }: FilterContentProps) {
  const { data } = useSWR(`${BASE_URL}/book-categories`, fetcher);

  const [localSelectedCategories, setLocalSelectedCategories] = useState<string[]>(selectedCategories);

  useEffect(() => {
    setLocalSelectedCategories(selectedCategories);
  }, [selectedCategories]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked ? [...localSelectedCategories, category] : localSelectedCategories.filter((c) => c !== category);

    setLocalSelectedCategories(updatedCategories);
    if (onChange) {
      onChange(updatedCategories);
    }
  };

  return (
    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div>
        <h3 className="font-semibold mb-4">Filter by Category</h3>
        <div className="space-y-3">
          {data?.data?.map((category: CategoryFilterProps, index: number) => (
            <label key={index} className="flex items-center gap-2">
              <Checkbox checked={localSelectedCategories.includes(category.name)} onCheckedChange={(checked) => handleCategoryChange(category.name, !!checked)} />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Clear Filter</Button>
    </div>
  );
}
