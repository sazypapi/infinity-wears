import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

import Rating from "../../../../components/reviews/Ratings";
import {
  getAllProductReviews,
  getProductRatings,
} from "../../../../utils/actions";
import ReviewRating from "../../../../components/reviews/ReviewRating";
import Containers from "../../../../components/global/Containers";

async function ReviewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { allReviews, product } = await getAllProductReviews(slug);
  const isAllReviews = !allReviews.length;
  const result = await getProductRatings(product.id);

  if ("error" in result) {
    return <div>Error loading ratings</div>;
  }

  const {
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
    totalRating,
    averageRating,
  } = result;
  return (
    <Containers className="py-5 px-2">
      <h1 className="text-center text-neutral-500 text-xl sm:text-3xl">
        All reviews on <span className="text-black">{product.name}</span>
      </h1>
      <h3 className="text-neutral-500 text-center text-sm sm:text-base mb-3">
        Real users. Real reviews.
      </h3>
      <Separator className="mb-4" />
      <ReviewRating
        averageRating={averageRating}
        fiveStar={fiveStar}
        fourStar={fourStar}
        oneStar={oneStar}
        threeStar={threeStar}
        totalRating={totalRating}
        twoStar={twoStar}
      />
      <Separator className="mb-4 mt-4" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-neutal-400">
        {isAllReviews ? (
          <h6 className="text-muted-foreground">No Current Review</h6>
        ) : (
          allReviews.map((review) => {
            return (
              <Card
                key={review.id}
                className="bg-white border-b-2 border-neutral-300 text-black"
              >
                <CardHeader>
                  <CardTitle className="flex align-middle  items-center justify-between">
                    {review.authorName}
                    <Image
                      src={review.authorImageUrl}
                      height={30}
                      width={30}
                      className="rounded rounded-full"
                      alt="profile image"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  {review.description}
                </CardContent>
                <CardFooter>
                  <Rating rating={review.rating} />{" "}
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </Containers>
  );
}

export default ReviewsPage;
