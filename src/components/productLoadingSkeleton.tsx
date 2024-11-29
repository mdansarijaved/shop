import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="mx-auto px-4 lg:px-10 py-8">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6 px-4 lg:px-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/4" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <div className="space-y-1">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
