"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ColorVariant, Product } from "@/generated/prisma";
import EditNamePriceDiscountQuantity from "./EditNamePriceDiscountQuantity";
import TextArea from "../form/TextArea";
import EditQuantityAvailableMaterialDiscount from "./EditQuantityAvailableMaterialDiscount";
import EditAdminSelects from "./EditAdminSelects";
import EditSEO from "./EditSEO";
import EditCollections from "./EditCollections";
import FormContainer from "../form/FormContainer";
import { editProductDetails } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";
import AdminCardHeader from "./AdminCardHeader";

function EditProductDetails({
  product,
  existingCollections,
  collectionName,
  variants,
}: {
  product: Product;
  existingCollections: string[];
  collectionName: string | undefined;
  variants: ColorVariant[];
}) {
  return (
    <FormContainer action={editProductDetails}>
      <Card className="w-full bg-white border-2 border-gray-200">
        <AdminCardHeader />
        <CardContent className="text-black">
          <EditNamePriceDiscountQuantity product={product} />
          <input type="hidden" name="productId" value={product.id} />
          <TextArea
            placeholder="Enter the description for the user"
            name="description"
            defaultValue={product.description}
          />
          {/* GENDER SEOs  */}
          <EditQuantityAvailableMaterialDiscount product={product} />
          <EditCollections
            collectionName={collectionName}
            existingCollections={existingCollections}
            product={product}
          />
          {/* <div className="flex justify-between align-middle items-center gap-4">
            <EditAdminSelects product={product} />
          </div> */}
        </CardContent>
        <div className="p-3 w-full flex justify-end">
          <SubmitButton text="Edit Product" loadingText="Editing Product" />
        </div>
      </Card>
    </FormContainer>
  );
}

export default EditProductDetails;
