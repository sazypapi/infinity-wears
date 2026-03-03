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
        <Label className="mb-2">SEO Tags</Label>
        <CreatableSelect
          instanceId="seo-tags"
          isMulti
          options={predefinedTags.map((tag) => ({ value: tag, label: tag }))}
          value={tags.map((tag) => ({ value: tag, label: tag }))}
          placeholder="Select or create tags..."
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,

              borderRadius: "7px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }),
          }}
          onChange={(selected) => {
            setTags(selected.map((option) => option.value));
          }}
          required
        />

        {/* Hidden input for form submission */}
        <input type="hidden" name="seoTags" value={JSON.stringify(tags)} />
      </div>
    </>
  );
}

export default SeoTags;
