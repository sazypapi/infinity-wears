"use client";
import { Button } from "@/components/ui/button";
import { ColorVariant, Prisma } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format";
import { toast } from "sonner";
import ProductDetailsDetailsBox from "./ProductDetailsDetailsBox";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "../../utils/actions";
type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
type Props = {
  productDetails: ProductWithVariants;
  onVariantChange?: (variantId: string) => void;
  currentId: string;
};

function ProductDetailsBigScreen({
  productDetails,
  onVariantChange,
  currentId,
}: Props) {
  const variants: ColorVariant[] = productDetails.variants;
  const variantIds = variants.map((variant) => variant.id);
  const [variantId, setVariantId] = useState(variantIds[0]);
  useEffect(() => {
    if (onVariantChange) {
      onVariantChange(variantId);
    }
  }, [variantId]);
  const currentVariant = variants.find((variant) => variant.id === variantId);
  const allSizes = Array.from(
    new Set(variants.flatMap((variant) => variant.sizes)),
  );

  const sizes: string[] = currentVariant!.sizes;
  const [size, setSize] = useState(currentVariant!.sizes[0]);
  useEffect(() => {
    if (currentVariant) {
      setSize(currentVariant.sizes[0]);
    }
  }, [variantId]);
  const classNameSelect = "bg-black text-white";
  const variantClassNameSelect = "border-black";
  let isDiscount = false;
  const [amount, setAmount] = useState(1);

  if (currentVariant?.discount != null && currentVariant.discount > 0) {
    isDiscount = true;
  }
  const formatStatus = (status: string) =>
    status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <div className="flex flex-col">
      <div className="w-[60%]">
        <h4 className="text-sm text-neutral-400">infinity wears</h4>
        <h1 className="text-2xl">{productDetails.name}</h1>
        {/* PRICE */}
        <div className="flex flex-row gap-2">
          <h2
            className={cn(
              isDiscount ? "line-through text-neutral-500 text-lg" : "text-lg",
            )}
          >
            {formatCurrency(currentVariant!.price)}
          </h2>
          <h2 className="flex flex-row text-lg">
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
        <div className="grid gap-3 grid-cols-6 mt-3">
          {variants.map((variantItem) => {
            const isVariant = variantItem.id === variantId;
            const isAvailable = variantItem.inStock;

            return (
              <button
                key={variantItem.id}
                disabled={!isAvailable}
                onClick={() => isAvailable && setVariantId(variantItem.id)}
                className={cn(
                  "p-2 flex justify-center items-center border-2 transition duration-500",
                  isVariant && isAvailable ? variantClassNameSelect : "",
                  !isAvailable
                    ? "border-neutral-200 opacity-40 cursor-not-allowed"
                    : "border-neutral-300 hover:border-black",
                )}
                type="button"
              >
                <div
                  className="w-5 h-5 rounded-full border-2 border-neutral-300 shadow-2xl"
                  style={{ backgroundColor: variantItem.colorHex }}
                />
              </button>
            );
          })}
        </div>
        {/* SIZE */}
        <h4 className="text-sm mt-7 text-neutral-600">Size: {size}</h4>
        <div className="grid gap-3 grid-cols-5">
          {allSizes.map((currentSize) => {
            const isSizeSelected = currentSize === size;
            const isAvailable = currentVariant?.sizes.includes(currentSize);

            return (
              <button
                key={currentSize}
                disabled={!isAvailable}
                type="button"
                onClick={() => isAvailable && setSize(currentSize)}
                className={cn(
                  "w-full h-10 flex items-center justify-center border-2 transition duration-200",
                  isSizeSelected && isAvailable
                    ? "bg-black text-white border-black"
                    : "",
                  !isAvailable
                    ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through"
                    : "hover:bg-black hover:text-white border-black",
                )}
              >
                {currentSize}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-10">
        {/* ADD TO CART */}

        <div className="w-[90%] flex flex-row gap-3">
          <div className="flex flex-row align-middle items-center justify-start gap-3 flex-1/4 ">
            <Button
              className="bg-transparent rounded-none flex justify-center items-center p-0 w-12 h-10 border-2 border-black text-2xl hover:border-black hover:bg-black hover:text-white transition duration-500 text-black"
              onClick={() => {
                setAmount((prev) => {
                  if (prev > 1) return prev - 1;
                  toast("You must have at least 1 product in cart");
                  return prev;
                });
              }}
              type="button"
            >
              -
            </Button>
            <p className="w-7 text-center">{amount}</p>
            <Button
              className="bg-transparent rounded-none flex justify-center items-center p-0 w-12 h-10 border-2 border-black text-2xl hover:border-black hover:bg-black hover:text-white transition duration-500 text-black"
              onClick={() => setAmount((prev) => prev + 1)}
              type="button"
            >
              +
            </Button>
          </div>
          <FormContainer action={addToCartAction}>
            <input type="hidden" name="productId" value={productDetails.id} />
            <input type="hidden" name="variantId" value={variantId} />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="price" value={currentVariant!.price} />
            <input
              type="hidden"
              name="discount"
              value={currentVariant!.discount ? currentVariant!.discount : 0}
            />

            <input type="hidden" name="size" value={size} />
            <input
              type="hidden"
              name="color"
              value={currentVariant!.colorName}
            />

            <SubmitButton
              className="bg-transparent text-black rounded-none p-0 w-80 h-10 border-2 border-black text-xl hover:border-black hover:bg-black hover:text-white transition duration-500"
              text="Add to Cart"
              loadingText="Adding to Cart"
            />
          </FormContainer>
          {/* <Button className="bg-transparent text-black rounded-none p-0 w-80 h-10 border-2 border-black text-xl hover:border-black hover:bg-black hover:text-white transition duration-500">
            Add to Cart
          </Button> */}
        </div>
        {/* DETAILS BOX */}
        <ProductDetailsDetailsBox productDetails={productDetails} />
      </div>
    </div>
  );
}

export default ProductDetailsBigScreen;
