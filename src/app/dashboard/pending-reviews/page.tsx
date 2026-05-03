import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import PendingReviewsContainer from "../../../../components/dashboard/pending-reviews/PendingReviews";
import { getPendingReviews } from "../../../../utils/actions";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function PendingReviews() {
  const pendingReviews = await getPendingReviews();
  if (pendingReviews.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No Pending Reviews</EmptyTitle>
          <EmptyDescription>You have no pending reviews</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/dashboard/reviews">Go to Reviews</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div>
      <PendingReviewsContainer pendingReviews={pendingReviews} />
    </div>
  );
}

export default PendingReviews;
