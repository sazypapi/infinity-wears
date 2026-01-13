import { Product } from "@/generated/prisma";
import React from "react";

function ViewImages({ product }: { product: Product }) {
  return (
    <div>
      <div className="mb-5">
        <p className="text-neutral-400 text-xs">Cover Image</p>
        <img
          src={product.coverImage}
          alt="Uploaded"
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>
      <div>
        <p className="text-neutral-400 text-xs">Product Images</p>
        <div className="grid sm:grid-cols-6 grid-cols-3 gap-1">
          {product.images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Preview"
              className="w-28 h-28 object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewImages;
