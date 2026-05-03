import { Skeleton } from "@/components/ui/skeleton";

function AccountLoading() {
  return (
    <>
      <div className="flex py-10 h-140">
        <Skeleton className="h-140 w-full" />
      </div>
    </>
  );
}

export default AccountLoading;
