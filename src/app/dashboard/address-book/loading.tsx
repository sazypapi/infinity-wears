import { Skeleton } from "@/components/ui/skeleton";

function AddressLoading() {
  return (
    <>
      <div className="hidden sm:flex py-10 h-120">
        <Skeleton className="w-full h-40" />
      </div>
      <div className="sm:hidden px-8 py-2">
        <Skeleton className="h-5 w-45 mb-3 mt-3" />
        <Skeleton className="h-40 w-full" />
      </div>
    </>
  );
}

export default AddressLoading;
