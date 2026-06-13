import { Prisma } from "@/generated/prisma";
import Link from "next/link";
import { formatCurrency } from "../../utils/format";
import { Badge } from "@/components/ui/badge";
import FavoriteToggleButton from "../shop/FavoriteToggleButton";
import HoverSwapImage from "../home/HoverSwapImage";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
type ProductsProps = {
  products: ProductWithVariants[];
};
function Products({
  products,
  categoryName,
}: {
  products: ProductsProps["products"];
  categoryName: string;
}) {
  return (
    <div className="sm:py-10 ">
      <div className="w-full grid grid-cols-2 mt-5 gap-y-5 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center text-center">
        {products.map((product) => {
          const firstVariant = product.variants[0];
          const isAnyVariantInStock = product.variants.some(
            (variant) => variant.inStock,
          );
          const secondVariant = product.variants[1];
          const isVariantSoldOut = product.quantity <= 0;
          return (
            <article key={product.id} className="group relative ">
              <Link
                href={`/collections/category/${categoryName.toLowerCase()}/product/${product.slug}`}>
                <div className="justify-center w-fit flex flex-col group items-center relative">
                  {!isAnyVariantInStock ? (
                    <div className="absolute right-0 top-0 z-20">
                      <Badge variant="secondary" className="shadow-2xl">
                        Out of Stock
                      </Badge>
                    </div>
                  ) : isVariantSoldOut ? (
                    <div className="absolute right-0 top-0 z-20">
                      <Badge variant="secondary" className="shadow-2xl">
                        Sold Out
                      </Badge>
                    </div>
                  ) : null}

                  {/* /*IMAGE  */}
                  <div className="w-40 h-56 md:w-44 md:h-60 lg:w-52 lg:h-72 rounded-lg relative overflow-hidden">
                    <HoverSwapImage
                      defaultImage={firstVariant.coverImage}
                      hoverImage={
                        secondVariant?.coverImage ?? product.images[0]
                      }
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
                          firstVariant.price *
                            (1 - firstVariant.discount / 100),
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
              <div className="absolute top-0 left-0 z-20">
                <FavoriteToggleButton productId={product.id} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
