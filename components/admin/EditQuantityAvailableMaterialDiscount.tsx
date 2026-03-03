"use client";
import { Product } from "@/generated/prisma";
import FormInput from "../form/FormInput";
import TextArea from "../form/TextArea";
import GenderSelect from "./GenderSelect";
import SeoTags from "./SeoTags";

import { useState } from "react";
function EditQuantityAvailableMaterialDiscount({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="flex flex-col gap-4 mt-3 sm:mt-2">
      <div className="grid grid-cols-1 gap-4 sm:mt-3 sm:grid-cols-3 sm:gap-10 mb-0">
        <div>
          <FormInput
            name="seoTitle"
            type="text"
            label="SEO Title"
            defaultValue={product.seoTitle}
          />
        </div>
        <div>
          <SeoTags product={product} />
        </div>
        <div>
          <GenderSelect value={product.gender} />
        </div>
      </div>
      <div>
        <TextArea
          name="seoDescription"
          labelText="SEO Description"
          placeholder="Enter SEO Description"
          defaultValue={product.seoDescription}
        />
      </div>
    </div>
  );
}

export default EditQuantityAvailableMaterialDiscount;
