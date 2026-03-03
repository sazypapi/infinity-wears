"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import CreatableSelect from "react-select/creatable";
import FormInput from "../form/FormInput";
import StatusSelect from "./StatusSelect";
import { Product } from "@/generated/prisma";
function EditCollections({
  existingCollections,
  collectionName,
  product,
}: {
  existingCollections: string[];
  collectionName: string | undefined;
  product: Product;
}) {
  const [collection, setCollection] = useState(
    collectionName ? collectionName : "",
  );
  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-10 mt-3 sm:mt-0">
      <div>
        <Label className="mb-2">Collection</Label>
        <CreatableSelect
          instanceId="seo-tags"
          options={existingCollections.map((collection) => ({
            value: collection,
            label: collection,
          }))}
          value={collection ? { value: collection, label: collection } : null}
          onChange={(selected) => setCollection(selected ? selected.value : "")}
          placeholder="Select or create a collection."
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,

              borderRadius: "7px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }),
          }}
        />

        {/* Hidden input for form submission */}
        <input type="hidden" name="collectionId" value={collection} />
      </div>
      <div>
        <FormInput
          name="material"
          label="Material"
          placeholder="material type"
          type="text"
          defaultValue={product.material}
        />
      </div>
      <div>
        <StatusSelect value={product.status} />
      </div>
    </div>
  );
}

export default EditCollections;
