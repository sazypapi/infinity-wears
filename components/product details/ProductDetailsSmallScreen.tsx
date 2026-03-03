"use client";
import { ColorVariant, Prisma } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { reviews } from "../../utils/reviews";
import Rating from "./Ratings";
import ReviewsCarousel from "./ReviewsCarousel";
import LeaveReview from "./LeaveReview";
import FAQ from "./FAQ";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "../../utils/actions";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function ProductDetailsSmallScreen({
  productDetails,
  onVariantChange,
}: {
  productDetails: ProductWithVariants;
  onVariantChange?: (variantId: string) => void;
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
  const oneStar = 4;
  const twoStar = 6;
  const threeStar = 12;
  const fourStar = 25;
  const fiveStar = 53;

  const totalRating = oneStar + twoStar + threeStar + fourStar + fiveStar;

  const averageRating =
    (1 * oneStar + 2 * twoStar + 3 * threeStar + 4 * fourStar + 5 * fiveStar) /
    totalRating;
  return (
    <div className="w-full p-2 ">
      <h4 className="text-xs mb-3 text-left text-neutral-400">
        infinity wears
      </h4>
      <h1 className="text-xl text-left">{productDetails.name}</h1>
      {/* {PRICE & DISCOUNT} */}
      <div className="flex flex-row gap-2 mt-3">
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
                  )}
                >
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
              )}
            >
              {currentSize}
            </button>
          );
        })}
      </div>
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
            }}
          >
            -
          </Button>
          <p className="h-10 flex justify-center align-middle items-center text-lg text-center">
            {amount}
          </p>
          <Button
            className="bg-transparent rounded-none flex justify-center items-center p-0  h-10 border-2 border-black text-xl hover:border-black hover:bg-black hover:text-white transition duration-500 text-black"
            onClick={() => setAmount((prev) => prev + 1)}
          >
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
            <SubmitButton
              className="w-full bg-transparent rounded-none p-0 text-black text-sm h-10 border-2 border-black hover:border-black hover:bg-black hover:text-white transition duration-500"
              text="Add to Cart"
              loadingText="Adding to Cart"
            />
          </FormContainer>
        </div>
      </div>
      {/* {DETAILS} */}
      <div className="flex flex-col align-middle items-center justify-center mt-10">
        <div>
          <h2 className="text-sm text-neutral-600">Description</h2>
          <p className=" text-xs">{productDetails.description}</p>
        </div>
        {/* GENDER CATEGORY METARIAL */}
        <div className="grid grid-cols-3 mt-5 w-full">
          <div className="flex justify-start flex-col">
            <p className="text-xs text-neutral-600">Category: </p>
            <span className="text-black text-xs">
              {[formatStatus(productDetails.category)]}
            </span>
          </div>
          <div className="flex justify-start flex-col">
            <p className="text-xs text-neutral-600">Material: </p>
            <span className="text-black text-xs">
              {[productDetails.material]}
            </span>
          </div>
          <div className="flex justify-start flex-col">
            <p className="text-xs text-neutral-600">Gender: </p>
            <span className="text-black text-xs">
              {[formatStatus(productDetails.gender)]}
            </span>
          </div>
        </div>
        {/* TAGS */}
        <div className="flex justify-start flex-col mt-4 w-full">
          <p className="text-xs text-neutral-600">Tags: </p>
          <div className="flex ">
            <span className="text-black text-xs">
              {[productDetails.seoTags[0]]}
            </span>

            <span className="text-black text-xs">
              {productDetails.seoTags[1] ? (
                <>, {[productDetails.seoTags[1]]}</>
              ) : (
                ""
              )}
            </span>

            <span className="text-black text-xs">
              {productDetails.seoTags[2] ? (
                <>, {[productDetails.seoTags[2]]}</>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </div>
      {/* {RATINGS AND REVIEW} */}
      <h2 className="text-neutral-600 text-center mt-10 mb-3 text-xl">
        Ratings and Reviews
      </h2>
      <div className="flex flex-col sm:flex-row align-middle justify-center gap-3 items-center w-full">
        <div className="flex flex-col align-middle items-center justify-center w-full">
          {/* FIVE STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2">
            <h6 className="text-xs mr-2 w-4">5</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-black" />
            <Progress value={(fiveStar / totalRating) * 100} />
            <h6 className="text-xs ml-2  w-6">{fiveStar}</h6>
          </section>
          {/* FOUR STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2  ">
            <h6 className="text-xs mr-2 w-4">4</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-black" />
            <Progress value={(fourStar / totalRating) * 100} />
            <h6 className="text-xs ml-2 w-6">{fourStar}</h6>
          </section>{" "}
          {/* THREE STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2">
            <h6 className="text-xs mr-2 w-4">3</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-black" />
            <Progress value={(threeStar / totalRating) * 100} />
            <h6 className="text-xs ml-2 w-6">{threeStar}</h6>
          </section>{" "}
          {/* TWO STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2">
            <h6 className="text-xs mr-2 w-4">2</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-black" />
            <Progress value={(twoStar / totalRating) * 100} />
            <h6 className="text-xs ml-2 w-6">{twoStar}</h6>
          </section>{" "}
          {/* ONE STAR */}
          <section className="flex align-middle items-center justify-center w-full">
            <h6 className="text-xs mr-2 w-4">1</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-black" />
            <Progress value={(oneStar / totalRating) * 100} />
            <h6 className="text-xs ml-2 w-6">{oneStar}</h6>
          </section>
        </div>
        <div className="flex-1/2 flex-col flex items-center justify-center">
          <h1 className="text-3xl">{averageRating.toFixed(1)}/5.0</h1>
          <h3 className="text-muted-foreground">Average Rating</h3>
        </div>
      </div>
      <ReviewsCarousel />
      {/* {SEE ALL REVIEWS AND LEAVE REVIEW} */}
      <div className="flex justify-between align-middle items-center p-4 mt-10">
        <p className="text-black text-left">View all reviews</p>
        <LeaveReview productId={productDetails.id} />
      </div>
      <FAQ />
    </div>
  );
}

export default ProductDetailsSmallScreen;
