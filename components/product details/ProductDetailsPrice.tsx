"use client";
import { ColorVariant, Prisma } from "@/generated/prisma";
import { useState } from "react";
import { formatCurrency } from "../../utils/format";
import { cn } from "@/lib/utils";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function ProductDetailsPrice({
  productDetails,
}: {
  productDetails: ProductWithVariants;
}) {
  const variants: ColorVariant[] = productDetails.variants;
  const variantIds = variants.map((variant) => variant.id);

  const [variantId, setVariantId] = useState(variantIds[0]);

  const currentVariant = variants.find((variant) => variant.id === variantId);

  let isDiscount = false;
  if (currentVariant?.discount != null && currentVariant.discount > 0) {
    isDiscount = true;
  }
  return (
    <div className="flex flex-row gap-2">
      <h2
        className={cn(
          isDiscount ? "line-through text-neutral-500 text-sm" : "text-sm",
        )}
      >
        {formatCurrency(currentVariant!.price)}
      </h2>
      <h2 className="flex flex-row text-sm">
        {currentVariant?.discount != null && isDiscount ? (
          <>
            {formatCurrency(
              currentVariant.price * (1 - currentVariant.discount / 100),
            )}{" "}
            <p className="text-red-500 text-xs">-{currentVariant.discount}%</p>
          </>
        ) : (
          ""
        )}
      </h2>
    </div>
  );
}

export default ProductDetailsPrice;
