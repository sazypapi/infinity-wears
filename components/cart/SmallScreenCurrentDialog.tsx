"use client";
import { SubmitButton } from "../form/Buttons";
import FormInput from "../form/FormInput";
import {
  createCollection,
  createReview,
  updateCartItems,
} from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ColorVariant, Prisma, Product } from "@/generated/prisma";
import ProductDetailsImagesBigScreen from "../product details/ProductDetailsImagesBigScreen";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartImagesBigScreen from "./CartBigDetailsImages";
import { useState } from "react";
import CartProductDetails from "./CartProductDetails";
import ProductImagesSmallScreen from "../product details/ProductImagesSmallScreen";
type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function SmallScreenCurrentDialog({
  color,
  size,
  product,
  itemAmount,
  currentVariantId,
  itemId,
  currentSize,
}: {
  color: string;
  size: string;
  product: ProductWithVariants;
  itemAmount: number;
  itemId: string;
  currentVariantId: string;
  currentSize: string;
}) {
  const [currentSelectedVariantId, setSelectedCurrentVariantId] =
    useState(currentVariantId);
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start">
        <p className="text-neutral-600 text-xs hover:underline hover:cursor-default">
          Color: {color} | Size: {size} &rarr;
        </p>
      </DialogTrigger>
      <DialogContent className=" bg-white rounded-xl shadow-sm border">
        <DialogTitle></DialogTitle>
        <FormContainer action={updateCartItems}>
          <DialogHeader className="my-5">
            <div className="flex flex-col align-middle justify-center items-center">
              <div className="col-span-3">
                <ProductImagesSmallScreen
                  currentVariantId={currentSelectedVariantId}
                  productDetails={product}
                />
              </div>
              <div className="col-span-2">
                <CartProductDetails
                  currentSize={currentSize}
                  itemId={itemId}
                  currentId={currentVariantId}
                  productDetails={product}
                  onVariantChange={setSelectedCurrentVariantId}
                  itemAmount={itemAmount}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <SubmitButton
              text="Update Details"
              loadingText="Updating..."
              className="bg-transparent border-2 border-black text-black hover:text-white hover:bg-black"
            />
          </DialogFooter>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}

export default SmallScreenCurrentDialog;
