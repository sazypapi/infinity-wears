import { Skeleton } from "@/components/ui/skeleton";

function ReviewsLoading() {
  return (
    <>
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-10">
        <Skeleton className="rounded-sm h-45" />
        <Skeleton className="rounded-sm h-45" />
        <Skeleton className="rounded-sm h-45" />
        <Skeleton className="rounded-sm h-45" />
      </div>
      <div className="grid sm:hidden grid-cols-1 gap-5">
        <Skeleton className="rounded-sm h-50" />
        <Skeleton className="rounded-sm h-50" />
      </div>
    </>
  );
}

export default ReviewsLoading;
