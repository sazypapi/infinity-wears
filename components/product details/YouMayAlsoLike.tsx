"use client";
import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../../utils/format";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function YouMayAlsoLike({
  youMayAlsoLike,
}: {
  youMayAlsoLike: ProductWithVariants[];
}) {
  return (
    <>
      <div className="w-full py-5 gap-15 grid-cols-2 lg:grid-cols-4 justify-items-center items-center text-center hidden sm:grid">
        {youMayAlsoLike.map((product) => {
          const firstVariant = product.variants[0];
          return (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <div className="justify-center w-fit flex flex-col group items-center">
                {/* /*IMAGE  */}
                <div className="w-36 h-48 sm:w-60 sm:h-72 rounded-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                  <Image
                    src={firstVariant.coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    fill
                  />
                  {/* <HoverSwapImage images={hoverImages} alt={product.name} /> */}
                </div>
                <div className="w-36 sm:w-60 mt-4">
                  <p className="text-gray-500 text-sm text-center truncate ">
                    {product.name}
                  </p>
                  <p className="text-gray-800 text-xs text-center truncate ">
                    {formatCurrency(firstVariant.price)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default YouMayAlsoLike;
