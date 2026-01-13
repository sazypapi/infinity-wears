"use client";
import { Product } from "@/generated/prisma";
import StatusSelect from "./StatusSelect";
import CheckboxInput from "../form/Checkbox";
import FormInput from "../form/FormInput";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useState } from "react";
function EditQuantityAvailableMaterialDiscount({
  product,
}: {
  product: Product;
}) {
  const [discount, setDiscount] = useState(product.discount?.toString());

  return (
    <>
      <StatusSelect value={product.status} />
      <CheckboxInput
        defaultChecked={product.inStock}
        label="In Stock"
        name="inStock"
      />
      <FormInput
        name="material"
        label="Material"
        placeholder="material type"
        type="text"
        defaultValue={product.material}
      />
      <div>
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
          value={discount}
          step="0.01"
          max="100"
          min="0"
        />
      </div>
    </>
  );
}

export default EditQuantityAvailableMaterialDiscount;
