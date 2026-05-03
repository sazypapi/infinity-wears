"use client";
import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../../utils/format";
import FavoriteToggleForm from "../shop/FavoriteToggleForm";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function YouMayAlsoLike({
  youMayAlsoLike,
  favoriteIds,
}: {
  youMayAlsoLike: ProductWithVariants[];
  favoriteIds: (string | null)[];
}) {
  return (
    <div className="w-full py-5 gap-15 grid-cols-2 lg:grid-cols-4 justify-items-center items-center text-center hidden sm:grid">
      {youMayAlsoLike.map((product, index) => {
        const firstVariant = product.variants[0];
        return (
          <div key={product.id} className="relative">
            <Link href={`/products/${product.slug}`}>
              <div className="justify-center w-fit flex flex-col group items-center">
                <div className="w-36 h-48 sm:w-60 sm:h-72 rounded-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                  <Image
                    src={firstVariant.coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <div className="w-36 sm:w-60 mt-4">
                  <p className="text-gray-500 text-sm text-center truncate">
                    {product.name}
                  </p>
                  <p className="text-gray-800 text-xs text-center truncate">
                    {formatCurrency(firstVariant.price)}
                  </p>
                </div>
              </div>
            </Link>
            <div className="absolute top-2 right-2">
              <FavoriteToggleForm
                productId={product.id}
                favoriteId={favoriteIds[index]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default YouMayAlsoLike;
