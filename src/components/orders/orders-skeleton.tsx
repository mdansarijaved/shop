import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function OrdersSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-0">
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[80px]" />
                </div>
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
