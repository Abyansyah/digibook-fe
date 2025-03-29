import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PublishedBookCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex p-4">
        <Skeleton className="w-24 h-36 rounded-md" />
        <div className="ml-4 flex flex-col flex-grow">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/4 mt-auto" />
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </Card>
  );
}
