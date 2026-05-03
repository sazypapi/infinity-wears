import { Skeleton } from "@/components/ui/skeleton";

function CustomOrderDetailsLoading() {
  return (
    <>
      <div className="p-1 hidden sm:flex sm:flex-col gap-3 w-full">
        <Skeleton className="w-[30%] h-30" />
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
      </div>
      <div className="p-1 sm:hidden flex flex-col gap-3 w-full">
        <Skeleton className="w-[60%] h-30" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>
    </>
  );
}

export default CustomOrderDetailsLoading;
