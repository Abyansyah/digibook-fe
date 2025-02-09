import { Skeleton } from '@/components/ui/skeleton';

export default function NewsCardSkeletonBanner() {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      <Skeleton className="aspect-[21/9] relative w-full " />

      <div className="absolute inset-0 " />

      <div className="absolute bottom-0 p-6 space-y-2">
        <Skeleton className="h-6 w-24 bg-white rounded-full" />

        <Skeleton className="h-8 w-3/4 bg-white rounded" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-white rounded" />
          <Skeleton className="h-4 w-5/6 bg-white rounded" />
        </div>

        <Skeleton className="h-4 w-20 bg-white rounded" />
      </div>
    </div>
  );
}
