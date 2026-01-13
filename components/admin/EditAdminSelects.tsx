"use client";
import { Product } from "@/generated/prisma";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Select from "react-select";

function EditAdminSelects({ product }: { product: Product }) {
  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const [sizes, setSizes] = useState<string[]>(product.sizes);

  const availableColors = ["Black", "White", "Red", "Blue", "Green", "Brown"];
  const [colors, setColors] = useState<string[]>(product.colors);
  return (
    <div className="flex sm:grid flex-col sm:grid-cols-2 sm:gap-10 w-full sm:my-5">
      <div>
        <Label className="mb-2">Sizes</Label>
        <Select
          instanceId="sizes-select"
          isMulti
          options={availableSizes.map((s) => ({ value: s, label: s }))}
          value={sizes.map((s) => ({ value: s, label: s }))}
          onChange={(selected) => setSizes(selected.map((item) => item.value))}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,

              borderRadius: "7px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }),
          }}
          required
        />
      </div>
      <input type="hidden" name="colors" value={JSON.stringify(colors)} />
      <input type="hidden" name="sizes" value={JSON.stringify(sizes)} />

      <div className="mt-3 sm:mt-0">
        <Label className="mb-2">Colors</Label>
        <Select
          instanceId="colors-select"
          isMulti
          options={availableColors.map((c) => ({ value: c, label: c }))}
          value={colors.map((c) => ({ value: c, label: c }))}
          onChange={(selected) => setColors(selected.map((item) => item.value))}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,

              borderRadius: "7px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }),
          }}
          required
        />
      </div>
    </div>
  );
}

export default EditAdminSelects;
