"use client";
import { Prisma } from "@/generated/prisma";
import { useState } from "react";
import ProductImagesSmallScreen from "./ProductImagesSmallScreen";
import ProductDetailsSmallScreen from "./ProductDetailsSmallScreen";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function SmallScreenDetails({
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
    <div className="flex flex-col justify-center align-middle items-center">
      <ProductImagesSmallScreen
        currentVariantId={currentVariantId}
        productDetails={productDetails}
      />
      <ProductDetailsSmallScreen
        productDetails={productDetails}
        onVariantChange={setCurrentVariantId}
      />
    </div>
  );
}

export default SmallScreenDetails;
