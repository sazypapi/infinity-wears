"use client";
import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../../utils/format";
import FavoriteToggleForm from "../shop/FavoriteToggleForm";
import HoverSwapImage from "../home/HoverSwapImage";

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
        const secondVariant = product.variants[1];
        return (
          <div key={product.id} className="relative">
            <Link href={`/products/${product.slug}`}>
              <div className="justify-center w-fit flex flex-col group items-center">
                <div className="w-40 h-56 md:w-44 md:h-60 lg:w-52 lg:h-72 rounded-lg relative overflow-hidden isolate">
                  <HoverSwapImage
                    defaultImage={firstVariant.coverImage}
                    hoverImage={secondVariant?.coverImage ?? product.images[0]}
                    alt={product.name}
                  />
                </div>
                <div className="w-40 md:w-44 lg:w-52 mt-4 h-20">
                  <p className="text-black text-base text-center truncate ">
                    {product.name}
                  </p>

                  {firstVariant.discount ? (
                    <p className="text-black text-base text-center truncate ">
                      {formatCurrency(
                        firstVariant.price * (1 - firstVariant.discount / 100),
                      )}
                      <span className="text-red-500 text-xs">
                        -{firstVariant.discount}%
                      </span>
                    </p>
                  ) : (
                    <p className="text-black text-base text-center truncate ">
                      {formatCurrency(firstVariant.price)}
                    </p>
                  )}
                  <p className="text-xs text-gray-600">
                    {product.variants.length > 1
                      ? `Available in ${product.variants.length} colors`
                      : ""}
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
