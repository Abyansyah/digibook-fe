import { useState } from 'react';
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
  // const [editorPicksOpen, setEditorPicksOpen] = useState(false);
  // const [publisherOpen, setPublisherOpen] = useState(false);
  // const [yearOpen, setYearOpen] = useState(false);
  // const [priceRange, setPriceRange] = useState([50]);

  const { data } = useSWR(`${BASE_URL}/book-categories`, fetcher);

  const [localSelectedCategories, setLocalSelectedCategories] = useState<string[]>(selectedCategories);

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
        {/* <h2 className="font-semibold mb-4">Filter Option</h2> */}
        {/* <div className="space-y-4">
          <Collapsible open={editorPicksOpen} onOpenChange={setEditorPicksOpen}>
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <span>Editor Picks</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${editorPicksOpen ? 'transform rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 pl-4">
              {editorPicks.map((pick) => (
                <div key={pick} className="cursor-pointer hover:text-primary">
                  {pick}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={publisherOpen} onOpenChange={setPublisherOpen}>
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <span>Choose Publisher</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${publisherOpen ? 'transform rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 pl-4">
              {publishers.map((publisher) => (
                <div key={publisher} className="cursor-pointer hover:text-primary">
                  {publisher}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={yearOpen} onOpenChange={setYearOpen}>
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <span>Select Year</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${yearOpen ? 'transform rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 pl-4">
              {years.map((year) => (
                <div key={year} className="cursor-pointer hover:text-primary">
                  {year}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div> */}
      </div>

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

      {/* <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider defaultValue={priceRange} max={100} step={1} className="mb-4" onValueChange={setPriceRange} />
        <div className="flex justify-between text-sm">
          <span>${Math.round(145 + priceRange[0] * 3.75)}</span>
          <span>$520</span>
        </div>
      </div> */}

      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Clear Filter</Button>
    </div>
  );
}
