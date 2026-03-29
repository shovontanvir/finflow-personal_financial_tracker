const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className}`}
  />
);

const LoadingSkeleton = () => {
  return (
    <main>
      {/* Header Skeleton */}
      <div className="border-b border-border">
        <div className="container py-4">
          <Skeleton className="h-8 w-full rounded" />
        </div>
      </div>

      <div className="container">
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>

        {/* Charts Grid Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 my-5">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>

        {/* Transaction List Header Skeleton */}
        <div className="my-5">
          <div className="w-full flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32 rounded" />
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Skeleton className="h-9 w-48 rounded" />
              </div>
              <Skeleton className="h-9 w-24 rounded" />
            </div>
          </div>

          {/* Mobile Filter Skeleton */}
          <div className="my-5 block md:hidden">
            <Skeleton className="h-9 w-full rounded" />
          </div>

          {/* Transaction Table Skeleton */}
          <div className="space-y-2 mt-6">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 rounded" />
              ))}
            </div>

            {/* Table Rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-10 rounded" />
                ))}
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoadingSkeleton;
