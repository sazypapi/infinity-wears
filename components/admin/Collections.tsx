"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import CreatableSelect from "react-select/creatable";
import FormInput from "../form/FormInput";
import StatusSelect from "./StatusSelect";

function Collections({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  const [collection, setCollection] = useState<string>("");
  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-10 mt-2 sm:mt-3">
      <div className="w-full">
        <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
          Collection
        </Label>
        <CreatableSelect
          instanceId="collections"
          options={existingCollections.map((collection) => ({
            value: collection,
            label: collection,
          }))}
          onChange={(selected) => setCollection(selected ? selected.value : "")}
          placeholder="select or create a collection."
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderRadius: "7px",
              border: "2px solid #d1d5db",
              boxShadow: "0 1px 2px 0 rgba(209, 213, 219, 0.3)",
              padding: "0px",
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              fontSize: "16px",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              fontSize: "16px",
            }),
          }}
        />
        <input type="hidden" name="collectionId" value={collection} />
      </div>
      <div>
        <FormInput
          name="material"
          label="Material"
          placeholder="material type"
          type="text"
        />
      </div>
      <div>
        <StatusSelect />
      </div>
    </div>
  );
}

export default Collections;
