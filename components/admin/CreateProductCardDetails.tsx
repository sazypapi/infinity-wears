"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormInput from "../form/FormInput";
import TextArea from "../form/TextArea";
import CheckboxInput from "../form/Checkbox";
import { useState } from "react";
import AdminSelects from "./AdminSelects";

import StatusSelect from "./StatusSelect";
import NamePriceDiscountQuantity from "./NamePriceDiscountQuantity";
import AdminCardHeader from "./AdminCardHeader";
import SEO from "./SEO";
import Collections from "./Collections";
function CreateProductCardDetails({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  const [discount, setDiscount] = useState("");
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
        {/* QUANTITY AVAILABLE MATERIAL SLUG */}
        <div className="mb-3 mt-5 sm:grid sm:grid-cols-4 sm:align-baseline flex flex-col gap-10 justify-between align-middle">
          <StatusSelect />
          <CheckboxInput label="In Stock" name="inStock" />
          <FormInput
            name="material"
            label="Material"
            placeholder="material type"
            type="text"
          />
          <div>
            {/* DISCOUNT */}
            <Label className="capitalize mb-2" htmlFor="name">
              Discount
            </Label>
            <Input
              id="discount"
              name="discount"
              type="number"
              className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300"
              placeholder="Discount(%)"
              onChange={(e) => setDiscount(e.target.value)}
              defaultValue={discount}
              step="0.01"
              max="100"
              min="0"
            />
          </div>
        </div>
        {/* COLOR SIZE */}
        <div className="flex justify-between align-middle items-center gap-4">
          <AdminSelects />
        </div>
        <SEO />
        <Collections existingCollections={existingCollections} />
      </CardContent>
    </Card>
  );
}

export default CreateProductCardDetails;
