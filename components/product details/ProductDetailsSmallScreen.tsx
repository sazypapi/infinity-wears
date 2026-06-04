/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ColorVariant, Prisma, Review } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import FAQ from "./FAQ";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "../../utils/actions";
import { SignInButton, useUser } from "@clerk/nextjs";
import { FeaturedProducts } from "../home/FeaturedProducts";
import FavoriteToggleForm from "../shop/FavoriteToggleForm";
import SmallScreenRatings from "./SmallScreenRatings";
import SmallScreenLastDetails from "./SmallScreenLastDetails";

export type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function ProductDetailsSmallScreen({
  productDetails,
  onVariantChange,
  oneStar,
  threeStar,
  twoStar,
  fourStar,
  fiveStar,
  totalRating,
  averageRating,
  reviews,
  youMayAlsoLike,
  favoriteIds,
}: {
  youMayAlsoLike: ProductWithVariants[];

  productDetails: ProductWithVariants;
  onVariantChange?: (variantId: string) => void;
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
  const variants: ColorVariant[] = productDetails.variants;
  const variantIds = variants.map((variant) => variant.id);
  const [variantId, setVariantId] = useState(variantIds[0]);
  useEffect(() => {
    if (onVariantChange) {
      onVariantChange(variantId);
    }
  }, [variantId]);
  const currentVariant = variants.find((variant) => variant.id === variantId);
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const allSizes = Array.from(
    new Set(variants.flatMap((variant) => variant.sizes)),
  ).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
  const { isSignedIn } = useUser();

  const [size, setSize] = useState(currentVariant!.sizes[0]);
  useEffect(() => {
    if (currentVariant) {
      setSize(currentVariant.sizes[0]);
    }
  }, [variantId]);
  const variantClassNameSelect = "border-black";
  let isDiscount = false;
  const [amount, setAmount] = useState(1);

  if (currentVariant?.discount != null && currentVariant.discount > 0) {
    isDiscount = true;
  }
  const formatStatus = (status: string) =>
    status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <div className="w-full p-2 ">
      <h4 className="text-xs mb-3 text-left text-neutral-400">
        infinity wears
      </h4>
      {/* {NAME} */}
      {currentVariant?.inStock ? (
        <h1 className="text-xl text-left">{productDetails.name}</h1>
      ) : (
        <h1 className="text-xl text-left">
          {productDetails.name}{" "}
          <span className="text-red-500 text-sm">Out of stock</span>
        </h1>
      )}
      {/* {PRICE & DISCOUNT} */}
      <div className="flex flex-row gap-2 mt-3">
        <h2
          className={cn(
            isDiscount ? "line-through text-neutral-500 text-sm" : "text-sm",
          )}>
          {formatCurrency(currentVariant!.price)}
        </h2>
        <h2 className="flex flex-row text-sm">
          {currentVariant?.discount != null && isDiscount ? (
            <>
              {formatCurrency(
                currentVariant.price * (1 - currentVariant.discount / 100),
              )}{" "}
              <p className="text-red-500 text-xs">
                -{currentVariant.discount}%
              </p>
            </>
          ) : (
            ""
          )}
        </h2>
      </div>
      {/* COLOR */}
      <div className="grid grid-cols-6 mt-3 w-[80%] sm:gap-3 sm:w-full">
        {variants.length !== 1
          ? variants.map((currentVariant) => {
              const isVariant = currentVariant.id === variantId;
              return (
                <button
                  key={currentVariant.id}
                  onClick={() => setVariantId(currentVariant.id)}
                  className={cn(
                    "h-7 w-7 sm:h-10 sm:w-full flex justify-center items-center rounded-full sm:rounded-none border-2 border-neutral-300 hover:border-black transition duration-500",
                    isVariant ? variantClassNameSelect : "",
                  )}>
                  <div
                    className="w-6 h-6 sm:h-5 sm:w-5 rounded-full border-2 border-neutral-300 shadow-2xl"
                    style={{ backgroundColor: currentVariant.colorHex }}
                  />
                </button>
              );
            })
          : ""}
      </div>
      {/* SIZE */}
      <h4 className="text-sm mt-7 text-neutral-600">Size: {size}</h4>
      {currentVariant?.sizes[0] !== "One Size" && (
        <div className="grid sm:gap-3 gap-2 grid-cols-5">
          {allSizes.map((currentSize) => {
            const isSizeSelected = currentSize === size;
            const isAvailable = currentVariant?.sizes.includes(currentSize);

            return (
              <button
                key={currentSize}
                disabled={!isAvailable}
                onClick={() => isAvailable && setSize(currentSize)}
                className={cn(
                  "w-full h-10 flex items-center justify-center border-2 text-sm transition duration-200",
                  isSizeSelected && isAvailable
                    ? "bg-black text-white border-black"
                    : "",
                  !isAvailable
                    ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through"
                    : "hover:bg-black hover:text-white border-black",
                )}>
                {currentSize}
              </button>
            );
          })}
        </div>
      )}
      {/* { ADD TO CART} */}
      <div className="grid grid-cols-5 justify-between gap-3 mt-10 items-center">
        <div className="col-span-2 grid grid-cols-3 justify-between items-center align-middle">
          <Button
            className=" bg-transparent rounded-none flex justify-center items-center p-0  h-10 border-2 border-black text-xl hover:border-black hover:bg-black hover:text-white transition duration-500 text-black"
            onClick={() => {
              setAmount((prev) => {
                if (prev > 1) return prev - 1;
                toast("You must have at least 1 product in cart");
                return prev;
              });
            }}>
            -
          </Button>
          <p className="h-10 flex justify-center align-middle items-center text-lg text-center">
            {amount}
          </p>
          <Button
            className="bg-transparent rounded-none flex justify-center items-center p-0  h-10 border-2 border-black text-xl hover:border-black hover:bg-black hover:text-white transition duration-500 text-black"
            onClick={() => setAmount((prev) => prev + 1)}>
            +
          </Button>
        </div>
        <div className="col-span-3 ">
          <FormContainer action={addToCartAction}>
            <input type="hidden" name="productId" value={productDetails.id} />
            <input type="hidden" name="variantId" value={variantId} />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="size" value={size} />
            <input type="hidden" name="price" value={currentVariant!.price} />
            <input
              type="hidden"
              name="discount"
              value={currentVariant!.discount ? currentVariant!.discount : 0}
            />
            <input
              type="hidden"
              name="color"
              value={currentVariant!.colorName}
            />
            {isSignedIn ? (
              currentVariant?.inStock ? (
                <SubmitButton
                  className="w-full bg-transparent rounded-none p-0 text-black text-sm h-10 border-2 border-black hover:border-black hover:bg-black hover:text-white transition duration-500"
                  text="Add to Cart"
                  loadingText="Adding to Cart"
                />
              ) : (
                <Button
                  type="button"
                  disabled
                  className="w-full bg-transparent rounded-none p-0 text-black text-sm h-10 border-2 border-black hover:border-black hover:bg-black hover:text-white transition duration-500">
                  Out of stock
                </Button>
              )
            ) : (
              <Button
                asChild
                type="button"
                className="w-full bg-transparent rounded-none p-0 text-black text-sm h-10 border-2 border-black hover:border-black hover:bg-black hover:text-white transition duration-500">
                <SignInButton mode="modal">Add to Cart</SignInButton>
              </Button>
            )}
          </FormContainer>
        </div>
      </div>

      <SmallScreenLastDetails productDetails={productDetails} />
      {/* {RATINGS} */}
      <SmallScreenRatings
        averageRating={averageRating}
        fiveStar={fiveStar}
        fourStar={fourStar}
        threeStar={threeStar}
        oneStar={oneStar}
        productDetails={productDetails}
        reviews={reviews}
        totalRating={totalRating}
        twoStar={twoStar}
      />
      <div className="mt-10">
        <FeaturedProducts items={youMayAlsoLike}>
          {youMayAlsoLike.map((product, index) => (
            <FavoriteToggleForm
              key={product.id}
              productId={product.id}
              favoriteId={favoriteIds[index]}
            />
          ))}
        </FeaturedProducts>
      </div>
      <FAQ />
    </div>
  );
}

export default ProductDetailsSmallScreen;
