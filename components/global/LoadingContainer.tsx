import { Skeleton } from "@/components/ui/skeleton";

function LoadingContainer() {
  return (
    <>
      <div className="hidden w-full pt-12 sm:grid gap-5 grid-cols-2 lg:grid-cols-4 justify-items-center items-center text-center">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
      <div className="grid w-full pt-12 sm:hidden gap-5 grid-cols-2 lg:grid-cols-4 justify-items-center items-center text-center">
        <LoadingProduct />
        <LoadingProduct />
      </div>
    </>
  );
}

function LoadingProduct() {
  return (
    <div className="justify-center w-fit flex flex-col items-center">
      <Skeleton className="w-36 h-48 sm:w-60 sm:h-72 rounded-lg" />
      <Skeleton className="w-36 sm:w-60 mt-2" />
    </div>
  );
}

export default LoadingContainer;
