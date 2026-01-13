"use client";
import { Input } from "@/components/ui/input";
import { Product } from "@/generated/prisma";
import React, { useState } from "react";
import PriceInput from "../form/PriceInput";
import FormInput from "../form/FormInput";
import { Label } from "@/components/ui/label";

function EditNamePriceDiscountQuantity({ product }: { product: Product }) {
  const [name, setName] = useState(product.name);
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  return (
    <div className="sm:grid sm:gap-4 sm:justify-between flex flex-col gap-2 sm:grid-cols-2 mb-3">
      <div>
        <Label className="capitalize mb-2" htmlFor="name">
          Product Name{" "}
        </Label>
        <Input
          id="name"
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
          className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300"
          defaultValue={name}
          placeholder="Product Name"
          required
        />
        <input type="hidden" name="slug" value={slug} />
      </div>
      <div className="flex justify-between gap-2 w-full sm:flex-row flex-col">
        <div className="sm:flex sm:flex-1/2">
          <PriceInput value={product.price} />
        </div>

        <div className="sm:flex sm:flex-1/2">
          <FormInput
            name="quantity"
            label="Quantity"
            type="number"
            placeholder="quantity"
            defaultValue={product.quantity.toString()}
          />
        </div>
      </div>
    </div>
  );
}

export default EditNamePriceDiscountQuantity;
