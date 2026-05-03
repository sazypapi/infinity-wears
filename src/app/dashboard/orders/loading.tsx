import { Skeleton } from "@/components/ui/skeleton";

function OrdersLoading() {
  return (
    <>
      <div className="p-1 hidden sm:flex sm:flex-col gap-3 w-full">
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
      </div>
      <div className="p-1 sm:hidden flex flex-col gap-3 w-full">
        <Skeleton className="w-full h-25" />
        <Skeleton className="w-full h-25" />
        <Skeleton className="w-full h-25" />
        <Skeleton className="w-full h-25" />
      </div>
    </>
  );
}

export default OrdersLoading;
