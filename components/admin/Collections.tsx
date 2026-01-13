"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import CreatableSelect from "react-select/creatable";

function Collections({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  const [collection, setCollection] = useState<string>("");
  return (
    <>
      <div className="w-full mt-4">
        <Label className="mb-2">Collection</Label>
        <CreatableSelect
          instanceId="seo-tags"
          options={existingCollections.map((collection) => ({
            value: collection,
            label: collection,
          }))}
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
    </>
  );
}

export default Collections;
