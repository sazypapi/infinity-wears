"use client";
import { Card, CardContent } from "@/components/ui/card";

import TextArea from "../form/TextArea";
import NamePriceDiscountQuantity from "./NamePriceDiscountQuantity";
import AdminCardHeader from "./AdminCardHeader";
import SEO from "./SEO";
import Collections from "./Collections";
function CreateProductCardDetails({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  return (
    <Card className="w-full bg-white border-2 border-gray-200">
      <AdminCardHeader />
      <CardContent className="text-black">
        {/* NAME PRICE DISCOUNT */}
        <NamePriceDiscountQuantity />
        {/* DESCRIPTION */}
        <TextArea
          name="description"
          placeholder="Enter the description for the user"
        />
        {/* COLOR SIZE */}

        <SEO />
        <Collections existingCollections={existingCollections} />
      </CardContent>
    </Card>
  );
}

export default CreateProductCardDetails;
