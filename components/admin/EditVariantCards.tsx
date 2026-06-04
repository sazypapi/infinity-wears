"use client";
import { ColorVariant } from "@/generated/prisma";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminProductVariantsHeader from "./AdminProductVariantsHeader";
import { Card } from "@/components/ui/card";
import EditBottomRowInputFieldsVariantCard from "./EditBottomRowInputFieldsVariantCard";
import EditVariantColor from "./EditVariantColor";
import EditVariantCoverImageUploader from "./EditVariantCoverImageUploader";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { editVariants } from "../../utils/actions";
import { SizeCategory } from "../../utils/types";
type VariantForm = {
  id: string;
  colorName: string;
  colorHex: string;
  coverImage: string;
  price: number | undefined;
  discount?: number | undefined | null;
  inStock: boolean;
  sizes: string[];
};

const EditVariantCards = forwardRef(function EditVariantCards(
  {
    productVariants,
    productId,
    sizeCategory,
  }: {
    productVariants: ColorVariant[];
    productId: string;
    sizeCategory: SizeCategory;
  },
  ref: React.Ref<{ resetSizes: (category: SizeCategory) => void }>,
) {
  const formattedForm: VariantForm[] = productVariants.map((variant) => ({
    id: variant.id,
    colorName: variant.colorName,
    colorHex: variant.colorHex,
    coverImage: variant.coverImage,
    price: variant.price,
    discount: variant.discount,
    inStock: variant.inStock,
    sizes: variant.sizes,
  }));
  const [variants, setVariants] = useState<VariantForm[]>(formattedForm);
  useImperativeHandle(ref, () => ({
    resetSizes: (category: SizeCategory) => {
      setVariants((prev) =>
        prev.map((v) => ({
          ...v,
          sizes: category === "accessories" ? ["One Size"] : [],
        })),
      );
    },
  }));

  const variantsJson = useMemo(() => JSON.stringify(variants), [variants]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        colorName: "",
        colorHex: "#000000",
        coverImage: "",
        price: undefined,
        discount: undefined,
        inStock: false,
        sizes: [],
      },
    ]);
  };
  const removeVariant = (id: string) => {
    if (variants.length === 1) {
      toast("You must have at least 1 variant");
    } else {
      setVariants((prev) => prev.filter((variant) => variant.id !== id));
    }
  };
  const updateVariant = <K extends keyof VariantForm>(
    id: string,
    field: keyof VariantForm,
    value: any,
  ) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant,
      ),
    );
  };
  return (
    <Card className="w-full bg-white border-2 border-gray-200 px-5">
      <FormContainer action={editVariants}>
        <input type="hidden" name="variants" value={variantsJson} />
        <input type="hidden" name="id" value={productId} />

        <div className="mb-3">
          <AdminProductVariantsHeader />
        </div>
        {variants.map((variant, index) => (
          <Card
            key={variant.id}
            className="w-full bg-white border-2 p-5 border-gray-200 mb-5">
            <EditBottomRowInputFieldsVariantCard
              discount={variant.discount}
              inStock={variant.inStock}
              index={variant.id}
              onChange={updateVariant}
              price={variant.price}
              sizeCategory={sizeCategory}
              sizes={variant.sizes}
            />
            <EditVariantColor
              colorHex={variant.colorHex}
              colorName={variant.colorName}
              index={variant.id}
              onChange={updateVariant}
            />
            <EditVariantCoverImageUploader
              coverImage={variant.coverImage}
              index={variant.id}
              onChange={updateVariant}
            />

            <div className="w-full flex justify-end gap-2 mt-2">
              <button
                onClick={() => removeVariant(variant.id)}
                className="text-red-500 bg-transparent px-2 py-1 text-xs hover:bg-red-500 hover:text-white border-2 border-red-500 transition duration-500 rounded-md"
                type="button">
                Remove
              </button>
              {index === variants.length - 1 && (
                <button
                  onClick={addVariant}
                  className="text-neutral-950 bg-transparent px-2 py-1 hover:bg-black text-xs hover:text-white border-2 border-black transition duration-500 rounded-md"
                  type="button">
                  + Add New Variant
                </button>
              )}
            </div>
          </Card>
        ))}
        <div className="p-3 w-full flex justify-end">
          <SubmitButton
            text="Edit Variants"
            loadingText="Editing Variants..."
          />
        </div>
      </FormContainer>
    </Card>
  );
});

export default EditVariantCards;
