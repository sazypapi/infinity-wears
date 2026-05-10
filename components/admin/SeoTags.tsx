"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import CreatableSelect from "react-select/creatable";
import { Product } from "@/generated/prisma";
function SeoTags({ product }: { product?: Product }) {
  const predefinedTags = [
    "Clothing",
    "Fashion",
    "Men",
    "Women",
    "Streetwear",
    "Casual",
    "Summer",
    "Winter",
  ];
  const [tags, setTags] = useState<string[]>(product?.seoTags || []);
  return (
    <>
      <div className="w-full">
        <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
          SEO Tags
        </Label>
        <CreatableSelect
          instanceId="seo-tags"
          isMulti
          options={predefinedTags.map((tag) => ({ value: tag, label: tag }))}
          value={tags.map((tag) => ({ value: tag, label: tag }))}
          placeholder="select or create tags..."
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
          onChange={(selected) => {
            setTags(selected.map((option) => option.value));
          }}
          required
        />
        <input type="hidden" name="seoTags" value={JSON.stringify(tags)} />
      </div>
    </>
  );
}

export default SeoTags;
