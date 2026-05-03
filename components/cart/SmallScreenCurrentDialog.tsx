"use client";
import { SubmitButton } from "../form/Buttons";
import { updateCartItems } from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Prisma } from "@/generated/prisma";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import SmallScreenProductDetailsImages from "./SmallScreenProductDetailsImages";
import SmallScreenCartDetails from "./SmallScreenCartDetails";
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
      <DialogContent className="bg-white rounded-xl shadow-sm border">
        <ScrollArea className="w-full h-[80vh] border-2 rounded-sm">
          <DialogTitle></DialogTitle>
          <FormContainer action={updateCartItems}>
            <DialogHeader className="my-5">
              <div className="flex flex-col align-middle justify-center items-center">
                <div className="w-full">
                  <SmallScreenProductDetailsImages
                    currentVariantId={currentSelectedVariantId}
                    productDetails={product}
                  />
                </div>
                <div className="w-full">
                  <SmallScreenCartDetails
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
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default SmallScreenCurrentDialog;
