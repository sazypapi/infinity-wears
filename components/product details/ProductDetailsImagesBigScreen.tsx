import { Prisma } from "@/generated/prisma";
import Image from "next/image";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function ProductDetailsImagesBigScreen({
  productDetails,
  currentVariantId,
}: {
  productDetails: ProductWithVariants;
  currentVariantId: string;
}) {
  const currentVariant = productDetails.variants.find(
    (variant) => variant.id === currentVariantId,
  );
  const otherVariantsCoverImages = productDetails.variants
    .filter((variant) => variant.id !== currentVariantId)
    .map((variant) => variant.coverImage);
  const allImages = [
    currentVariant!.coverImage,
    ...otherVariantsCoverImages,
    ...productDetails.images,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-3">
      {allImages.map((image) => (
        <div key={image} className="relative aspect-3/4 w-full">
          <Image
            src={image}
            alt={productDetails.name}
            fill
            // sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
}

export default ProductDetailsImagesBigScreen;
