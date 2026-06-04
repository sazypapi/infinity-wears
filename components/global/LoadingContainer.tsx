import { Skeleton } from "@/components/ui/skeleton";

function LoadingContainer() {
  return (
    <div className="w-full pt-12 grid gap-y-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center text-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={
            i >= 6 ? "hidden lg:flex" : i >= 2 ? "hidden md:flex" : "flex"
          }>
          <LoadingProduct />
        </div>
      ))}
    </div>
  );
}

function LoadingProduct() {
  return (
    <div className="justify-center w-fit flex flex-col items-center gap-2">
      <Skeleton className="w-36 h-48 md:w-40 md:h-56 lg:w-52 lg:h-72 rounded-lg" />
      <Skeleton className="w-36 h-3 md:w-40 lg:w-52 rounded-md" />
      <Skeleton className="w-24 h-3 md:w-28 lg:w-36 rounded-md" />
    </div>
  );
}

export default LoadingContainer;
