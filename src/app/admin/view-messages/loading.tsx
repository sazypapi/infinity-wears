import Containers from "../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function ViewMessagesLoading() {
  return (
    <Containers className="py-10 px-2">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Heading */}
      <div className="flex justify-center py-3">
        <Skeleton className="h-7 w-40" />
      </div>

      {/* Desktop filter bar */}
      <div className="hidden sm:flex gap-2 mb-4">
        <Skeleton className="h-7 w-64 rounded-2xl" />
        <Skeleton className="h-7 w-20 rounded-2xl" />
        <Skeleton className="h-7 w-24 rounded-2xl" />
        <Skeleton className="h-7 w-24 rounded-2xl" />
      </div>

      {/* Mobile filter bar */}
      <div className="sm:hidden grid grid-cols-3 px-2 items-center gap-2 mb-4">
        <Skeleton className="h-8 col-span-2 rounded-2xl" />
        <Skeleton className="h-8 col-span-1 rounded-2xl" />
      </div>

      {/* Table header */}
      <div className="grid sm:grid-cols-6 grid-cols-4 items-center sm:py-3 p-2 gap-2 sm:px-2 mb-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12 hidden sm:block" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-12 hidden sm:block" />
        <Skeleton className="h-3 w-16" />
      </div>

      {/* Table rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="grid sm:grid-cols-6 grid-cols-4 items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3 gap-2">
          <Skeleton className="h-4 w-14 bg-neutral-400/50" />
          <Skeleton className="h-4 w-20 bg-neutral-400/50" />
          <Skeleton className="h-4 w-16 hidden sm:block bg-neutral-400/50" />
          <Skeleton className="h-4 w-24 bg-neutral-400/50" />
          <Skeleton className="h-4 w-16 hidden sm:block bg-neutral-400/50" />
          <Skeleton className="h-4 w-14 bg-neutral-400/50" />
        </div>
      ))}
    </Containers>
  );
}

export default ViewMessagesLoading;
