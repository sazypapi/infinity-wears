"use client";
import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import { formatCurrency } from "../../../utils/format";
import { removeFromWishlist } from "../../../utils/actions";
import FormContainer from "../../form/FormContainer";
import { SubmitButton } from "../../form/Buttons";

type Wishlist = Prisma.WishlistGetPayload<{
  include: {
    product: {
      include: {
        variants: true;
      };
    };
  };
}>;

function WishlistList({ wishlist }: { wishlist: Wishlist[] }) {
  return (
    <div className="flex flex-col gap-3">
      {wishlist.map((item, index) => {
        const variant = item.product.variants[0];
        const discount = variant?.discount ?? 0;
        const inStock = item.product.variants.some((v) => v.inStock);
        const discountedPrice = variant?.price * (1 - discount / 100);

        return (
          <div
            key={item.id}
            className={`flex flex-col justify-center items-center w-full ${
              index !== wishlist.length - 1
                ? "border-b-2 border-neutral-200 pb-3"
                : ""
            }`}
          >
            <div className="grid grid-cols-5 justify-between items-center w-full">
              {/* Image */}
              <div className="h-16 w-16 sm:h-24 sm:w-24 shrink-0 relative overflow-hidden rounded-lg col-span-1">
                <Image
                  src={variant?.coverImage}
                  fill
                  className="object-cover"
                  alt={item.product.name}
                />
              </div>

              {/* Info */}
              <div className="col-span-4 flex flex-col gap-1">
                <h4 className="truncate">{item.product.name}</h4>
                <h6 className="text-xs text-neutral-600">
                  {item.product.variants.length} Variant
                  {item.product.variants.length > 1 ? "s" : ""}
                </h6>

                {discount > 0 ? (
                  <>
                    <div className="flex flex-row items-baseline gap-1">
                      <h5 className="text-[10px] text-neutral-500 line-through">
                        {formatCurrency(variant?.price)}
                      </h5>
                      <span className="text-[10px] text-red-500">
                        -{discount}%
                      </span>
                    </div>
                    <h5 className="text-sm">
                      {formatCurrency(discountedPrice)}
                    </h5>
                  </>
                ) : (
                  <h5 className="text-sm">{formatCurrency(variant?.price)}</h5>
                )}
              </div>
            </div>

            {/* Actions */}
            <div
              className={`w-full flex ${inStock ? "justify-end" : "justify-between items-center"}`}
            >
              {!inStock && (
                <span className="text-xs text-red-500">Out of stock</span>
              )}
              <FormContainer action={removeFromWishlist}>
                <input type="hidden" name="productId" value={item.productId} />
                <SubmitButton
                  className="bg-white hover:bg-black text-xs sm:text-sm border-2 border-black hover:text-white text-black transition duration-500"
                  text="Remove"
                  loadingText="Removing..."
                />
              </FormContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WishlistList;
