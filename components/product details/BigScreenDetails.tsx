"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma, Review } from "@/generated/prisma";
import ProductDetailsImagesBigScreen from "./ProductDetailsImagesBigScreen";
import ProductDetailsBigScreen from "./ProductDetailsBigScreen";
import { useState } from "react";
import SingpleProductRatingReview from "./SingpleProductRatingReview";
import YouMayAlsoLike from "./YouMayAlsoLike";
import LeaveReview from "./LeaveReview";
import FAQ from "./FAQ";
import Link from "next/link";
type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function BigScreenDetails({
  productDetails,
  youMayAlsoLike,
  oneStar,
  threeStar,
  twoStar,
  fourStar,
  fiveStar,
  totalRating,
  averageRating,
  reviews,
  favoriteIds,
}: {
  productDetails: ProductWithVariants;
  youMayAlsoLike: ProductWithVariants[];
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  totalRating: number;
  averageRating: number;
  reviews: Review[];
  favoriteIds: (string | null)[];
}) {
  const [currentVariantId, setCurrentVariantId] = useState(
    productDetails.variants[0].id,
  );

  return (
    <div className="shadow-sm rounded-sm px-2 py-10  w-full ">
      <div className="w-full flex justify-between gap-10">
        <div className="flex basis-4/6">
          <ScrollArea className="h-180 w-full rounded-md border-2 border-neutral-100">
            <ProductDetailsImagesBigScreen
              currentVariantId={currentVariantId}
              productDetails={productDetails}
            />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div className="flex basis-2/6">
          <ProductDetailsBigScreen
            currentId={currentVariantId}
            productDetails={productDetails}
            onVariantChange={setCurrentVariantId}
          />
        </div>
      </div>
      <div className="mt-4 pt-4">
        <h2 className="text-left text-neutral-700 mb-3 text-xl">
          Ratings and Reviews
        </h2>
        {reviews.length > 0 ? (
          <>
            <SingpleProductRatingReview
              averageRating={averageRating}
              fiveStar={fiveStar}
              fourStar={fourStar}
              oneStar={oneStar}
              threeStar={threeStar}
              totalRating={totalRating}
              twoStar={twoStar}
              reviews={reviews}
            />
            <div className="flex justify-between align-middle items-center p-4">
              <p className="text-black text-left hover:underline">
                <Link href={`/reviews/${productDetails.slug}`}>
                  View all reviews
                </Link>
              </p>
              <LeaveReview productId={productDetails.id} />
            </div>
          </>
        ) : (
          <div className="w-full align-middle items-center justify-center pt-5 flex flex-col gap-4">
            <h1 className="text-2xl text-neutral-600 text-center">
              There are no reviews for this product
            </h1>
            <div className="flex flex-col justify-center align-middle items-center gap-1">
              <p>Be the first to leave a review</p>
              <div className="flex justify-between align-middle items-center">
                <LeaveReview productId={productDetails.id} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {YOU MAY ALSO LIKE} */}
      <div className="mt-30">
        <h2 className="text-center mb-2 text-neutral-600 text-3xl">
          You May Also Like
        </h2>
        <p className="mb-10 text-xs text-black text-center">
          Users who bought {productDetails.name} also bought these
        </p>
        <YouMayAlsoLike
          youMayAlsoLike={youMayAlsoLike}
          favoriteIds={favoriteIds}
        />
      </div>
      <FAQ />
    </div>
  );
}

export default BigScreenDetails;
