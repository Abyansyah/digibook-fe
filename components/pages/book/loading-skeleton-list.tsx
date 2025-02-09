import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="flex gap-6">
            <div className="relative w-[140px] h-[200px] flex-shrink-0">
              <Skeleton className="w-full h-full rounded-lg" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/80">
                <Skeleton className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <Skeleton className="h-4 w-1/3 mb-1" />
                <Skeleton className="h-6 w-1/2 mb-2" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />

              <div className="flex items-center gap-4 text-sm">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
