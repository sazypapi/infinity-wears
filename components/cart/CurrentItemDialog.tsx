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
type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function CurrentItemDialog({
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
        <p className="text-neutral-600 text-sm hover:underline hover:cursor-default">
          Color: {color} | Size: {size} &rarr;
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%] bg-white rounded-xl shadow-sm border">
        <DialogTitle></DialogTitle>
        <FormContainer action={updateCartItems}>
          <DialogHeader className="my-5">
            <div className="grid grid-cols-5 justify-between gap-10">
              <div className="col-span-3">
                <ScrollArea className="h-120 w-full rounded-md border-2 border-neutral-100">
                  <CartImagesBigScreen
                    currentVariantId={currentSelectedVariantId}
                    productDetails={product}
                  />
                </ScrollArea>
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

export default CurrentItemDialog;
