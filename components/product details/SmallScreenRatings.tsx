import { Review } from "@/generated/prisma";
import { ProductWithVariants } from "./ProductDetailsSmallScreen";
import { FaStar } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import ReviewsCarousel from "./ReviewsCarousel";
import LeaveReview from "./LeaveReview";

function SmallScreenRatings({
  reviews,
  productDetails,
  oneStar,
  threeStar,
  twoStar,
  fourStar,
  fiveStar,
  totalRating,
  averageRating,
}: {
  reviews: Review[];
  productDetails: ProductWithVariants;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  totalRating: number;
  averageRating: number;
}) {
  return (
    <>
      {reviews.length > 0 ? (
        <>
          {/* {RATINGS AND REVIEW} */}
          <h2 className="text-neutral-600 text-center mt-10 mb-3 text-xl">
            Ratings and Reviews
          </h2>
          <div className="flex flex-col sm:flex-row align-middle justify-center gap-3 items-center w-full">
            <div className="flex flex-col align-middle items-center justify-center w-full">
              {/* FIVE STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2">
                <h6 className="text-xs mr-2 w-4">5</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(fiveStar / totalRating) * 100} />
                <h6 className="text-xs ml-2  w-6">{fiveStar}</h6>
              </section>
              {/* FOUR STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2  ">
                <h6 className="text-xs mr-2 w-4">4</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(fourStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{fourStar}</h6>
              </section>{" "}
              {/* THREE STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2">
                <h6 className="text-xs mr-2 w-4">3</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(threeStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{threeStar}</h6>
              </section>{" "}
              {/* TWO STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2">
                <h6 className="text-xs mr-2 w-4">2</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(twoStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{twoStar}</h6>
              </section>{" "}
              {/* ONE STAR */}
              <section className="flex align-middle items-center justify-center w-full">
                <h6 className="text-xs mr-2 w-4">1</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(oneStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{oneStar}</h6>
              </section>
            </div>
            <div className="flex-1/2 flex-col flex items-center justify-center">
              <h1 className="text-3xl">{averageRating.toFixed(1)}/5.0</h1>
              <h3 className="text-muted-foreground">Average Rating</h3>
            </div>
          </div>
          <ReviewsCarousel reviews={reviews} />
          {/* {SEE ALL REVIEWS AND LEAVE REVIEW} */}
          <div className="flex justify-between align-middle items-center p-4 mt-10">
            <p className="text-black text-left">View all reviews</p>
            <LeaveReview productId={productDetails.id} />
          </div>
        </>
      ) : (
        <div className="w-full align-middle items-center justify-center pt-5 mt-3 flex flex-col">
          <h1 className="text-base text-neutral-600 text-center">
            There are no reviews for this product
          </h1>
          <div className="flex flex-col justify-center align-middle items-center gap-1">
            <p className="text-xs">Be the first to leave a review</p>
            <div className="flex justify-between align-middle items-center">
              <LeaveReview productId={productDetails.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SmallScreenRatings;
