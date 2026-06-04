"use client";
import {
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card } from "@/components/ui/card";
import AdminProductVariantsHeader from "./AdminProductVariantsHeader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BottomRowInputFieldsVariantCard from "./BottomRowInputFieldsVariantCard";
import VariantColor from "./VariantColor";
import VariantCoverImageUploader from "./VariantCoverImageUploader";
import { SizeCategory } from "../../utils/types";

type VariantForm = {
  id: string;
  colorName: string;
  colorHex: string;
  coverImage: string;
  price: undefined;
  discount?: number | undefined;
  inStock: boolean;
  sizes: string[];
};

const CreateProductVariant = forwardRef(function CreateProductVariant(
  {
    onAllCoverImagesUploaded,
    sizeCategory,
  }: {
    onAllCoverImagesUploaded: (value: boolean) => void;
    sizeCategory: SizeCategory;
  },
  ref: React.Ref<{ resetSizes: (category: SizeCategory) => void }>,
) {
  const [variants, setVariants] = useState<VariantForm[]>([
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

  useEffect(() => {
    const allUploaded = variants.every(
      (variant) => variant.coverImage && variant.coverImage.length > 0,
    );
    onAllCoverImagesUploaded(allUploaded);
  }, [variants, onAllCoverImagesUploaded]);

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
        sizes: sizeCategory === "accessories" ? ["One Size"] : [],
      },
    ]);
  };

  const updateVariant = (id: string, field: keyof VariantForm, value: any) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const removeVariant = (id: string) => {
    if (variants.length === 1) {
      toast("You must have at least 1 variant");
      return;
    }
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  return (
    <Card className="w-full bg-white border-2 p-4 border-gray-200">
      <input type="hidden" name="variants" value={variantsJson} />
      <AdminProductVariantsHeader />
      {variants.map((variant) => (
        <Card
          key={variant.id}
          className="w-full bg-white border-2 p-5 border-gray-200">
          <BottomRowInputFieldsVariantCard
            discount={variant.discount}
            inStock={variant.inStock}
            index={variant.id}
            onChange={updateVariant}
            price={variant.price}
            sizes={variant.sizes}
            sizeCategory={sizeCategory}
          />
          <VariantColor
            colorHex={variant.colorHex}
            colorName={variant.colorName}
            index={variant.id}
            onChange={updateVariant}
          />
          <div>
            <VariantCoverImageUploader
              coverImage={variant.coverImage}
              index={variant.id}
              onChange={updateVariant}
            />
          </div>
          <div className="w-full flex justify-end gap-2">
            <Button
              onClick={() => removeVariant(variant.id)}
              className="text-red-500 bg-transparent hover:bg-red-500 hover:text-white border-2 border-red-500 transition duration-500"
              type="button">
              Remove
            </Button>
            <Button
              onClick={addVariant}
              className="text-neutral-950 bg-transparent hover:bg-black hover:text-white border-2 border-black transition duration-500"
              type="button">
              + Add New Variant
            </Button>
          </div>
        </Card>
      ))}
    </Card>
  );
});

export default CreateProductVariant;
