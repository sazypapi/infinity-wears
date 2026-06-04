"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProductDetails from "./EditProductDetails";
import { Collection, ColorVariant, Product } from "@/generated/prisma";
import EditImageContainer from "./EditImageContainer";
import EditVariantCards from "./EditVariantCards";
import { getSizeCategory, SizeCategory } from "../../utils/types";
import { useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function AdminEditTab({
  product,
  collectionName,
  existingCollections,
  variants,
}: {
  product: Product;
  collectionName: string | undefined;
  existingCollections: string[];
  variants: ColorVariant[];
}) {
  const [sizeCategory, setSizeCategory] = useState<SizeCategory>(
    getSizeCategory(variants[0].sizes),
  );
  const variantRef = useRef<{ resetSizes: (category: SizeCategory) => void }>(
    null,
  );

  const handleCategoryChange = (category: SizeCategory) => {
    setSizeCategory(category);
    variantRef.current?.resetSizes(category);
  };

  return (
    <div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="variant">Variants</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <EditProductDetails
            variants={variants}
            existingCollections={existingCollections}
            product={product}
            collectionName={collectionName}
          />
        </TabsContent>

        <TabsContent value="variant">
          <div className="flex items-center gap-6 my-4">
            {(["clothing", "footwear", "accessories"] as SizeCategory[]).map(
              (cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <Checkbox
                    id={`edit-size-cat-${cat}`}
                    checked={sizeCategory === cat}
                    className="border-2 border-gray-600"
                    onCheckedChange={() => handleCategoryChange(cat)}
                  />
                  <label
                    htmlFor={`edit-size-cat-${cat}`}
                    className="text-xs sm:text-sm capitalize text-black cursor-pointer">
                    {cat}
                  </label>
                </div>
              ),
            )}
          </div>
          <EditVariantCards
            productId={product.id}
            productVariants={variants}
            sizeCategory={sizeCategory}
            ref={variantRef}
          />
        </TabsContent>

        <TabsContent value="images">
          <EditImageContainer product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminEditTab;
