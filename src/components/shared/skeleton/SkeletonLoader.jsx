import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProductCard() {
  return (
    <div className="">
      <Card className="w-full h-98  rounded-md p-0">
        
        {/* 1. Image Skeleton */}
        <CardHeader className="p-0 relative">
          <Skeleton className="w-full h-60 rounded-md" />
        </CardHeader>
        
        <CardContent className="pt-4">
          {/* 2. Category & Rating Skeleton */}
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-20" /> {/* Category */}
            <Skeleton className="h-4 w-12" /> {/* Rating */}
          </div>
          
          {/* 3. Title Skeleton */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          
          {/* 4. Price Skeleton */}
          <Skeleton className="h-7 w-16" />
        
        </CardContent>
        
        
      </Card>
    </div>
  );
}