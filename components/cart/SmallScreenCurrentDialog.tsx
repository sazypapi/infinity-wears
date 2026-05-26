"use client";
import { SubmitButton } from "../form/Buttons";
import { updateCartItems } from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <Sheet>
      <SheetTrigger className="flex justify-start">
        <p className="text-neutral-600 text-xs hover:underline hover:cursor-default">
          Color: {color} | Size: {size} &rarr;
        </p>
      </SheetTrigger>
      <SheetContent className="bg-white border-l w-full sm:max-w-md p-0">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col min-h-full p-4">
            <SheetHeader className="mb-4">
              <SheetTitle className="sr-only">Update Cart Item</SheetTitle>
            </SheetHeader>
            <FormContainer action={updateCartItems}>
              <div className="flex flex-col gap-4">
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
              <SheetFooter className="mt-6">
                <SubmitButton
                  text="Update Details"
                  loadingText="Updating..."
                  className="w-full bg-transparent border-2 border-black text-black hover:text-white hover:bg-black"
                />
              </SheetFooter>
            </FormContainer>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default SmallScreenCurrentDialog;
