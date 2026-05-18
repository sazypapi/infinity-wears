import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../../utils/format";
import { Badge } from "@/components/ui/badge";
import FavoriteToggleButton from "../shop/FavoriteToggleButton";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
type ProductsProps = {
  products: ProductWithVariants[];
};
function Products({ products }: ProductsProps) {
  return (
    <div className="sm:py-10 ">
      <div className="w-full sm:gap-15 gap-4 grid-cols-2 mt-5 lg:grid-cols-4 justify-items-center items-center text-center grid">
        {products.map((product) => {
          const firstVariant = product.variants[0];
          const isAnyVariantInStock = product.variants.some(
            (variant) => variant.inStock,
          );
          const isVariantSoldOut = product.quantity <= 0;
          return (
            <article key={product.id} className="group relative ">
              <Link href={`/search/products/${product.slug}`}>
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
                  <div className="w-36 h-48 sm:w-60 sm:h-72 rounded-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                    <Image
                      src={firstVariant.coverImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      fill
                    />
                    {/* <HoverSwapImage images={hoverImages} alt={product.name} /> */}
                  </div>
                  <div className="w-36 sm:w-60 mt-4 h-20">
                    <p className="text-black text-base text-center truncate ">
                      {product.name}
                    </p>

                    {firstVariant.discount ? (
                      <p className="text-black text-base text-center truncate ">
                        {/* <span className="text-xs text-neutral-500 line-through">
                        {formatCurrency(firstVariant.price)}
                      </span>{" "} */}
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
