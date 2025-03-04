'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonPost = () => {
  return (
    <Card className="transition-all">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-2 w-28" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
