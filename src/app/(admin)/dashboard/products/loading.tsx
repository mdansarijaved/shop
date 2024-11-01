import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full p-2 md:p-5 xl:p-10">
      <div className="space-y-4">
        <Skeleton className="h-10 w-[400px]" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  );
}
