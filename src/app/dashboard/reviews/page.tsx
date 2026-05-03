import { getAllUsersReviews } from "../../../../utils/actions";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
import AllReviews from "../../../../components/dashboard/reviews/AllReviews";
async function ReviewsPage() {
  const allReviews = await getAllUsersReviews();
  if (allReviews.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No Reviews Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t reviewed any products yet
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div>
      <AllReviews allReviews={allReviews} />
    </div>
  );
}

export default ReviewsPage;
