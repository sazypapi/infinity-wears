"use client";
import { Prisma, Review } from "@/generated/prisma";
import { useState } from "react";
import ProductImagesSmallScreen from "./ProductImagesSmallScreen";
import ProductDetailsSmallScreen from "./ProductDetailsSmallScreen";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function SmallScreenDetails({
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
    <div className="flex flex-col justify-center align-middle items-center">
      <ProductImagesSmallScreen
        currentVariantId={currentVariantId}
        productDetails={productDetails}
      />
      <ProductDetailsSmallScreen
        productDetails={productDetails}
        onVariantChange={setCurrentVariantId}
        averageRating={averageRating}
        fiveStar={fiveStar}
        fourStar={fourStar}
        oneStar={oneStar}
        threeStar={threeStar}
        totalRating={totalRating}
        twoStar={twoStar}
        reviews={reviews}
        favoriteIds={favoriteIds}
        youMayAlsoLike={youMayAlsoLike}
      />
    </div>
  );
}

export default SmallScreenDetails;
