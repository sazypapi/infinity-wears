"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@/generated/prisma";
import ProductDetailsImagesBigScreen from "./ProductDetailsImagesBigScreen";
import ProductDetailsBigScreen from "./ProductDetailsBigScreen";
import { useState } from "react";
import SingpleProductRatingReview from "./SingpleProductRatingReview";
import YouMayAlsoLike from "./YouMayAlsoLike";
import LeaveReview from "./LeaveReview";
import FAQ from "./FAQ";
type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function BigScreenDetails({
  productDetails,
  youMayAlsoLike,
}: {
  productDetails: ProductWithVariants;
  youMayAlsoLike: ProductWithVariants[];
}) {
  const [currentVariantId, setCurrentVariantId] = useState(
    productDetails.variants[0].id,
  );

  return (
    <div className="shadow-sm rounded-sm px-2 py-10">
      <div className="w-full flex justify-between gap-10">
        <div className="flex flex-3/5">
          <ScrollArea className="h-180 w-full rounded-md border-2 border-neutral-100">
            <ProductDetailsImagesBigScreen
              currentVariantId={currentVariantId}
              productDetails={productDetails}
            />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div className="flex flex-2/5">
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
        <SingpleProductRatingReview />
        <div className="flex justify-between align-middle items-center p-4">
          <p className="text-black text-left">View all reviews</p>
          <LeaveReview productId={productDetails.id} />
        </div>
      </div>
      {/* {YOU MAY ALSO LIKE} */}
      <div className="mt-30">
        <h2 className="text-center mb-2 text-neutral-600 text-3xl">
          You May Also Like
        </h2>
        <p className="mb-10 text-xs text-black text-center">
          Users who bought {productDetails.name} also bought these
        </p>
        <YouMayAlsoLike youMayAlsoLike={youMayAlsoLike} />
      </div>
      <FAQ />
    </div>
  );
}

export default BigScreenDetails;
