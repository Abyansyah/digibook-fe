import { Grid2X2, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <button className={`p-2 rounded-lg ${view === 'grid' ? 'bg-gray-200' : ''}`} onClick={() => onViewChange('grid')} aria-label="Grid view">
        <Grid2X2 className="h-4 w-4" />
      </button>
      <button className={`p-2 rounded-lg ${view === 'list' ? 'bg-gray-200' : ''}`} onClick={() => onViewChange('list')} aria-label="List view">
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
